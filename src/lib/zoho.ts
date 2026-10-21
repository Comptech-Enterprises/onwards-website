const ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.in";
const API_DOMAIN = process.env.ZOHO_API_DOMAIN || "https://www.zohoapis.in";

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });

  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token?${params}`, {
    method: "POST",
  });
  const body = await res.json();

  if (!res.ok || !body.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(body)}`);
  }

  cachedToken = {
    accessToken: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  };
  return cachedToken.accessToken;
}

interface LeadInput {
  name: string;
  email: string;
  phone: string;
  teamSize: string;
  heardFrom: string;
  requirements?: string;
  leadSource: string;
  cityPreferred?: string;
}

interface ZohoLead {
  Last_Name: string;
  Email?: string;
  Phone?: string;
  Mobile?: string;
  Contact_Number_1?: string;
  Company: string;
  Lead_Source: string;
  Owner?: { id: string };
  Description: string;
  City_Preferred?: string;
  [key: string]: unknown;
}

function cleanPhone(raw: string): string {
  // Strip +, spaces, dashes — Zoho Contact_Number_1 max 12 chars
  return raw.replace(/[^0-9]/g, "").slice(0, 12);
}

function toLead(data: LeadInput): ZohoLead {
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || firstName || data.email || "Website Lead";
  const phone = cleanPhone(data.phone);

  const descParts: string[] = [];
  if (data.teamSize) descParts.push(`Team Size: ${data.teamSize}`);
  if (data.heardFrom) descParts.push(`Heard From: ${data.heardFrom}`);
  if (data.requirements) descParts.push(`Requirements: ${data.requirements}`);

  const lead: ZohoLead = {
    First_Name: firstName,
    Last_Name: lastName,
    Email: data.email,
    Phone: data.phone,
    Mobile: data.phone,
    Contact_Number_1: phone,
    Company: "Unknown",
    Lead_Source: data.leadSource || "Website",
    Description: descParts.join("\n"),
  };

  if (process.env.ZOHO_LEAD_OWNER_ID) {
    lead.Owner = { id: process.env.ZOHO_LEAD_OWNER_ID };
  }
  if (data.cityPreferred) {
    lead.City_Preferred = data.cityPreferred;
  }

  return lead;
}

export async function createLead(
  data: LeadInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const token = await getAccessToken();
    const lead = toLead(data);

    const res = await fetch(`${API_DOMAIN}/crm/v2/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [lead] }),
    });
    const body = await res.json();
    const record = body?.data?.[0];

    if (!res.ok || record?.status !== "success") {
      console.error("[ZOHO] Lead create failed:", JSON.stringify(body));
      return { success: false, error: "Failed to create lead in CRM" };
    }

    return { success: true, id: record.details?.id };
  } catch (error) {
    console.error("[ZOHO] createLead error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
