/* =========================
   GOOGLE APPS SCRIPT MAILER
========================= */

const SCRIPT_URL = process.env.APPS_SCRIPT_URL;

/**
 * PRIVATE HELPER: Handles the actual communication with Google Apps Script
 */
async function postToScript(payload) {
  if (!SCRIPT_URL) {
    throw new Error("APPS_SCRIPT_URL is not defined in environment variables");
  }

  return await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/* =========================
   VERIFY MAILER (TEST)
========================= */
export async function verifyMailer() {
  try {
    await postToScript({
      to: "yourpersonalemail@gmail.com",
      subject: "PRAVAHA Mailer Ready",
      html: "<p>PRAVAHA 2K26 Mailer is ready ✅</p>",
    });
    console.log("✅ Apps Script Mailer Ready");
  } catch (err) {
    console.error("❌ Mailer Verify Failed:", err.message);
  }
}

/* =========================
   NORMAL EVENT APPROVAL MAIL
========================= */
export async function sendPaymentApprovalMail({
  to,
  fullName,
  eventName,
  transactionId,
}) {
  try {
    await postToScript({
      to,
      subject: `Registration Confirmed | ${eventName} | PRAVAHA 2K26`,
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f7f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="padding:40px 10px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:40px; color:#334155; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <div style="text-align:center; margin-bottom: 30px;">
          <h1 style="margin:0; color:#0f172a; font-size: 28px; font-weight: 800; letter-spacing:-0.5px;">
            PRAVAHA <span style="color:#0891b2;">2K26</span>
          </h1>
          <p style="margin-top:8px; color:#64748b; font-size:14px; text-transform: uppercase; letter-spacing: 1px;">
            Official Registration Confirmation
          </p>
        </div>

        <div style="border-top:2px solid #f1f5f9; margin-bottom:30px;"></div>

        <p style="font-size:16px; color: #1e293b;">
          Dear <strong>${fullName}</strong>,
        </p>

        <p style="font-size:15px; line-height:1.6; color: #475569;">
          We are pleased to inform you that your payment has been
          <strong style="color:#16a34a;">successfully verified</strong>. Your 
          registration for the event is now officially confirmed.
        </p>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:20px; margin:25px 0;">
          <table style="width:100%; font-size:14px; border-collapse: collapse;">
            <tr>
              <td style="padding:8px 0; color:#64748b;">Event Name</td>
              <td style="padding:8px 0; text-align:right; color:#0f172a;"><strong>${eventName}</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Registration Status</td>
              <td style="padding:8px 0; text-align:right; color:#16a34a;"><strong>Confirmed</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#64748b;">Transaction ID</td>
              <td style="padding:8px 0; text-align:right; color:#0f172a; font-family: monospace;"><strong>${transactionId}</strong></td>
            </tr>
          </table>
        </div>

        <div style="margin:30px 0; text-align:center;">
          <p style="margin-bottom:15px; font-size:14px; color:#475569;">Join the official WhatsApp group for real-time updates:</p>
          <a href="https://chat.whatsapp.com/LbjF1AivyB3IJFwFhF3ZG9" target="_blank" 
             style="display:inline-block; padding:12px 24px; background:#22c55e; color:#ffffff; text-decoration:none; font-weight:bold; border-radius:6px; font-size:15px;">
             Join WhatsApp Group
          </a>
        </div>

        <p style="font-size:14px; line-height:1.6; color:#64748b;">
          Please retain this email. You may be asked to present this confirmation (digital or printed) during event check-in. Venue and reporting times will be shared shortly.
        </p>

        <div style="border-top:1px solid #f1f5f9; margin-top:30px; padding-top:20px; text-align:center;">
          <p style="margin:0; font-size:14px; color:#1e293b; font-weight: 600;">Team PRAVAHA 2K26</p>
          <p style="margin:4px 0 0; font-size:12px; color:#94a3b8;">RGMCET, Nandyal</p>
        </div>
      </div>
    </div>
  </body>
</html>`,
    });
    console.log("✅ Approval mail sent to", to);
  } catch (err) {
    console.error("❌ Approval Mail Error:", err.message);
  }
}

/* =========================
   TRANSACTION REJECTED MAIL
========================= */
export async function transactionRejectedMail({ to, fullName }) {
  try {
    await postToScript({
      to,
      subject: "Action Required | PRAVAHA 2K26 Transaction",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#fff5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="padding:40px 10px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:40px; color:#334155; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-top: 4px solid #ef4444;">
        
        <div style="text-align:center; margin-bottom: 30px;">
          <h1 style="margin:0; color:#0f172a; font-size: 28px;">PRAVAHA <span style="color:#ef4444;">2K26</span></h1>
          <p style="margin-top:8px; color:#64748b; font-size:14px; font-weight: bold;">TRANSACTION UPDATE</p>
        </div>

        <p style="font-size:16px;">Dear <strong>${fullName}</strong>,</p>
        
        <p style="font-size:15px; line-height:1.6; color: #475569;">
          We regret to inform you that your transaction for <strong>PRAVAHA 2K26</strong> has been 
          <span style="color:#ef4444; font-weight: bold;">Rejected</span> due to a verification discrepancy.
        </p>
        
        <p style="font-size:15px; line-height:1.6; color: #475569;">
          Don't worry! You can register again by submitting a valid payment screenshot and the correct transaction details via the portal.
        </p>

        <div style="margin-top:30px; padding:25px; background:#fef2f2; border:1px solid #fee2e2; border-radius:10px;">
          <p style="margin-top:0; color:#991b1b; font-size:14px; font-weight:bold; margin-bottom: 15px;">Need Assistance? Contact Coordinators:</p>
          
          <table width="100%" style="font-size:13px; color:#451a1a; line-height:1.6;">
            <tr>
              <td style="padding-bottom:10px;"><strong>S. MD. Arif</strong><br/>9398875293</td>
              <td style="padding-bottom:10px;"><strong>S. MD. Umar Farook</strong><br/>9014185582</td>
            </tr>
            <tr>
              <td><strong>K. Arshad</strong><br/>8179479455</td>
              <td></td>
            </tr>
          </table>
        </div>

        <div style="margin-top:30px; text-align:center; color:#94a3b8; font-size:12px;">
          <p>— Team PRAVAHA 2K26 | RGMCET</p>
        </div>
      </div>
    </div>
  </body>
</html>`,
    });
    console.log("❌ Rejection mail sent to", to);
  } catch (err) {
    console.error("❌ Rejection Mail Error:", err.message);
  }
}

/* ✅ DEFAULT EXPORT */
export default {
  verifyMailer,
  sendPaymentApprovalMail,
  transactionRejectedMail,
};
