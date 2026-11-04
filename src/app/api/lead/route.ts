import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/zoho";
import { sendLeadEmail } from "@/lib/mail";

function deriveLeadSource(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p === "/") return "Website - Homepage";
  if (p.startsWith("/delhi")) return "Website - Delhi";
  if (p.startsWith("/noida")) return "Website - Noida";
  if (p.startsWith("/gurgaon")) return "Website - Gurugram";
  if (p.startsWith("/offices")) return "Website - Solutions";
  if (p.startsWith("/enterprise")) return "Website - Enterprise";
  if (p.startsWith("/about")) return "Website - About";
  if (p.startsWith("/contact")) return "Website - Contact Us";
  return "Website";
}

function deriveCityPreferred(pathname: string): string | undefined {
  const p = pathname.toLowerCase();
  if (p.startsWith("/delhi")) return "Delhi";
  if (p.startsWith("/noida")) return "Noida";
  if (p.startsWith("/gurgaon")) return "Gurugram";
  return undefined;
}

function validateLead(body: Record<string, unknown>): Record<string, string> {
  const errs: Record<string, string> = {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const teamSize = String(body.teamSize || "").trim();
  const requirements = String(body.requirements || "").trim();

  if (!name || name.length < 2) errs.name = "Enter a valid name";
  else if (/\d/.test(name)) errs.name = "Name should not contain numbers";
  else if (name.length > 100) errs.name = "Name is too long";

  if (!email) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = "Enter a valid email";
  else if (/\.(test|example|invalid)$/i.test(email)) errs.email = "Enter a real email address";

  const digits = phone.replace(/\D/g, "");
  if (!digits) errs.phone = "Phone number is required";
  else if (digits.length < 10 || digits.length > 15) errs.phone = "Enter a valid phone number";

  if (!teamSize) errs.teamSize = "Team size is required";
  else if (teamSize.length > 50) errs.teamSize = "Invalid team size";

  if (requirements.length > 2000) errs.requirements = "Requirements too long";

  return errs;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, teamSize, heardFrom, requirements, pathname, _t } =
      body;

    // Honeypot check — silently reject
    if (body.company_url) {
      return NextResponse.json({ message: "Enquiry Sent.", zoho: true, mail: true });
    }

    // Time-based check — form submitted too fast (under 3 seconds)
    if (_t && Date.now() - Number(_t) < 3000) {
      return NextResponse.json({ message: "Enquiry Sent.", zoho: true, mail: true });
    }

    // Cloudflare Turnstile verification
    const turnstileToken = body["cf-turnstile-response"];
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        console.error("[API/lead] Turnstile failed:", turnstileData);
        return NextResponse.json(
          { error: "Bot verification failed", errors: { _form: "Verification failed. Please refresh and try again." } },
          { status: 403 },
        );
      }
    }

    const fieldErrors = validateLead(body);
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { error: "Validation failed", errors: fieldErrors },
        { status: 400 },
      );
    }

    const leadSource = deriveLeadSource(pathname || "/");
    const cityPreferred = deriveCityPreferred(pathname || "/");

    // Run Zoho + Brevo email in parallel — same as old site (Promise.allSettled)
    const [zohoResult, mailResult] = await Promise.allSettled([
      createLead({
        name,
        email,
        phone,
        teamSize,
        heardFrom,
        requirements: requirements || "",
        leadSource,
        cityPreferred,
      }),
      sendLeadEmail({
        name,
        email,
        phone,
        teamSize,
        heardFrom,
        requirements: requirements || "",
        leadSource,
        pathname: pathname || "/",
      }),
    ]);

    const zoho =
      zohoResult.status === "fulfilled" ? zohoResult.value : { success: false };
    const mail =
      mailResult.status === "fulfilled" ? mailResult.value : { success: false };

    if (!zoho.success) {
      console.error(
        "[API/lead] Zoho failed:",
        zohoResult.status === "rejected"
          ? zohoResult.reason
          : (zoho as { error?: string }).error,
      );
    }
    if (!mail.success) {
      console.error(
        "[API/lead] Mail failed:",
        mailResult.status === "rejected"
          ? mailResult.reason
          : (mail as { error?: string }).error,
      );
    }

    // Always return success to user (same as old site)
    return NextResponse.json({
      message: "Enquiry Sent.",
      zoho: zoho.success,
      mail: mail.success,
    });
  } catch (error) {
    console.error("[API/lead] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
