const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

interface LeadMailData {
  name: string;
  email: string;
  phone: string;
  teamSize: string;
  heardFrom: string;
  requirements?: string;
  leadSource: string;
  pathname: string;
}

function buildHtml(data: LeadMailData): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Team Size", data.teamSize],
    ["Heard From", data.heardFrom],
    ["Lead Source", data.leadSource],
    ["Page", data.pathname],
  ];
  if (data.requirements) {
    rows.push(["Requirements", data.requirements]);
  }

  const tableRows = rows
    .map(
      ([label, value]) => `<tr>
        <td valign="top" width="50%" style="padding-top: 10px; font-weight: 600;">${label}</td>
        <td valign="top" width="50%" style="padding-top: 10px;">${value}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style>
    body { margin: 0; padding: 0; background: #f1f1f1; font-family: 'Montserrat', sans-serif; font-size: 15px; line-height: 1.8; color: rgba(0,0,0,.6); }
  </style>
</head>
<body>
  <center style="width: 100%; background-color: #f1f1f1; padding: 50px 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden;">
      <div style="padding: 1.5em 2.5em; text-align: center; background: #fff;">
        <img src="https://pub-3b83e50fb69e4560821c6dd2d4c277a1.r2.dev/images/redesigned/logo/onward-logo.svg" alt="Onward Workspaces" height="50" />
      </div>
      <div style="background: #559A9D; padding: 20px; color: #fff;">
        <h2 style="margin: 0 0 4px; font-size: 18px; color: #fff;">Dear Admin,</h2>
        <p style="margin: 0; color: rgba(255,255,255,.9);">Here is a new lead submission. Details below:</p>
      </div>
      <div style="padding: 20px 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          ${tableRows}
        </table>
      </div>
      <div style="background: #000; padding: 16px 20px; text-align: center; color: rgba(255,255,255,.7); font-size: 13px;">
        &copy; ${new Date().getFullYear()} Onward Workspaces. All Rights Reserved
      </div>
    </div>
  </center>
</body>
</html>`;
}

export async function sendLeadEmail(
  data: LeadMailData,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return { success: false, error: "BREVO_API_KEY not configured" };
  }

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Onward Workspaces", email: "mannat@onwardworkspaces.com" },
        to: [
          { email: "leads@onwardworkspaces.com" },
          { email: "suvratjain@onwardworkspaces.com" },
          { email: "performance@onwardworkspaces.com" },
        ],
        subject: "New Lead Form Submission",
        htmlContent: buildHtml(data),
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      console.error("[BREVO] Mail failed:", JSON.stringify(body));
      return { success: false, error: `Brevo error ${res.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error("[BREVO] sendLeadEmail error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
