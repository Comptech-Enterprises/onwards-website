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
  return "Website";
}

function deriveCityPreferred(pathname: string): string | undefined {
  const p = pathname.toLowerCase();
  if (p.startsWith("/delhi")) return "Delhi";
  if (p.startsWith("/noida")) return "Noida";
  if (p.startsWith("/gurgaon")) return "Gurugram";
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, teamSize, heardFrom, requirements, pathname } =
      body;

    if (!name || !email || !phone || !teamSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
