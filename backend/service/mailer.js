/* =========================
   GOOGLE APPS SCRIPT MAILER
========================= */
{/*
const SCRIPT_URL = process.env.APPS_SCRIPT_URL;

export async function verifyMailer() {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "yourpersonalemail@gmail.com",
        subject: "Mailer Ready",
        html: "<p>Mailer is ready ✅</p>",
      }),
    });

    console.log("✅ Apps Script Mailer Ready");
  } catch (err) {
    console.error("❌ Mailer Verify Failed:", err.message);
  }
}

export async function sendPaymentApprovalMail({
  to,
  fullName,
  eventName,
  transactionId,
  amount,
}) {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject: `Registration Confirmed | ${eventName} | PRAVAHA 2K26`,
        html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#050814; font-family:Arial, Helvetica, sans-serif;">
    <div style="padding:28px;">
      <div style="max-width:620px; margin:auto; background:#0b1025; border-radius:18px; padding:32px; color:#ffffff;">

        <!-- HEADER -->
        <div style="text-align:center;">
          <h1 style="margin:0; color:#22d3ee; letter-spacing:1px;">
            PRAVAHA 2K26
          </h1>
          <p style="margin-top:6px; color:#94a3b8; font-size:13px;">
            Official Event Registration Confirmation
          </p>
        </div>

        <hr style="border:none; border-top:1px solid #1e293b; margin:26px 0;" />

        <!-- GREETING -->
        <p style="font-size:15px;">
          Dear <strong>${fullName}</strong>,
        </p>

        <p style="font-size:15px; line-height:1.6;">
          We are pleased to inform you that your payment has been
          <strong style="color:#22c55e;">successfully verified</strong> and your
          registration for the event listed below has been officially confirmed.
        </p>

        <!-- DETAILS CARD -->
        <div style="
          background:#020617;
          border:1px solid #1e293b;
          border-radius:14px;
          padding:18px;
          margin:22px 0;
        ">
          <table style="width:100%; font-size:14px;">
            <tr>
              <td style="padding:6px 0; color:#94a3b8;">Event Name</td>
              <td style="padding:6px 0; text-align:right;"><strong>${eventName}</strong></td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#94a3b8;">Registration Status</td>
              <td style="padding:6px 0; text-align:right; color:#22c55e;">
                <strong>Confirmed</strong>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#94a3b8;">Transaction ID</td>
              <td style="padding:6px 0; text-align:right;">
                <strong>${transactionId}</strong>
              </td>
            </tr>
          </table>
        </div>

        <!-- WHATSAPP GROUP -->
        <div style="
          margin:26px 0;
          padding:18px;
          border-radius:14px;
          background:#022c22;
          border:1px solid #14532d;
          text-align:center;
        ">
          <p style="margin:0 0 10px; font-size:15px;">
            📢 Join the official WhatsApp group for updates & announcements
          </p>
          <a
            href="https://chat.whatsapp.com/LbjF1AivyB3IJFwFhF3ZG9"
            target="_blank"
            style="
              display:inline-block;
              padding:10px 18px;
              background:#22c55e;
              color:#022c22;
              text-decoration:none;
              font-weight:bold;
              border-radius:999px;
              font-size:14px;
            "
          >
            Join WhatsApp Group
          </a>
        </div>

        <!-- NEXT STEPS -->
        <p style="font-size:15px; line-height:1.6;">
          Please retain this email for your records. You may be required to present
          this confirmation (digital or printed) during event check-in.
        </p>

        <p style="font-size:15px; line-height:1.6;">
          Further details regarding the event schedule, venue, reporting time, and
          instructions will be communicated via email and official channels.
        </p>

        <!-- SIGN OFF -->
        <p style="margin-top:26px; font-size:15px;">
          We look forward to welcoming you and wish you a rewarding experience at
          <strong> PRAVAHA 2K26</strong>.
        </p>

        <p style="margin-top:34px; font-size:13px; color:#94a3b8; text-align:center;">
          — Team PRAVAHA 2K26<br/>
          RGMCET
        </p>

      </div>
    </div>
  </body>
</html>

        `,
      }),
    });

    console.log("✅ Approval mail sent to", to);
  } catch (err) {
    console.error("❌ Approval Mail Error:", err.message);
  }
}


export async function transactionRejectedMail({ to, fullName }) {
  try {
    // We added the fetch call here so it actually SENDS
    await postToScript({
      to,
      subject: "PRAVAHA 2K26 | Transaction Rejected",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#050814; font-family:Arial, Helvetica, sans-serif;">
    <div style="padding:28px;">
      <div style="max-width:620px; margin:auto; background:#0b1025; border-radius:18px; padding:32px; color:#ffffff;">
        <div style="text-align:center;">
          <h1 style="margin:0; color:#f87171; letter-spacing:1px;">PRAVAHA 2K26</h1>
          <p style="margin-top:6px; color:#94a3b8; font-size:13px;">Transaction Update</p>
        </div>
        <hr style="border:none; border-top:1px solid #1e293b; margin:26px 0;" />
        <p style="font-size:15px;">Dear <strong>${fullName}</strong>,</p>
        <p style="font-size:15px; line-height:1.6;">
          We regret to inform you that your transaction for the <strong>PRAVAHA event</strong> 
          has been <strong style="color:#ef4444;">rejected</strong>.
        </p>
        <p style="font-size:15px; line-height:1.6;">
          If this was unintentional, you may register again by submitting a valid payment screenshot and correct transaction details.
        </p>
        <p style="margin-top:34px; font-size:13px; color:#94a3b8; text-align:center;">— Team PRAVAHA 2K26<br/>RGMCET</p>
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


export default {
  verifyMailer,
  sendPaymentApprovalMail,
   transactionRejectedMail,
};
*/}

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
  <body style="margin:0; padding:0; background:#050814; font-family:Arial, Helvetica, sans-serif;">
    <div style="padding:28px;">
      <div style="max-width:620px; margin:auto; background:#0b1025; border-radius:18px; padding:32px; color:#ffffff;">
        <div style="text-align:center;">
          <h1 style="margin:0; color:#22d3ee; letter-spacing:1px;">PRAVAHA 2K26</h1>
          <p style="margin-top:6px; color:#94a3b8; font-size:13px;">Official Event Registration Confirmation</p>
        </div>
        <hr style="border:none; border-top:1px solid #1e293b; margin:26px 0;" />
        <p style="font-size:15px;">Dear <strong>${fullName}</strong>,</p>
        <p style="font-size:15px; line-height:1.6;">
          We are pleased to inform you that your payment has been
          <strong style="color:#22c55e;">successfully verified</strong> and your
          registration has been officially confirmed.
        </p>
        <div style="background:#020617; border:1px solid #1e293b; border-radius:14px; padding:18px; margin:22px 0;">
          <table style="width:100%; font-size:14px;">
            <tr>
              <td style="padding:6px 0; color:#94a3b8;">Event Name</td>
              <td style="padding:6px 0; text-align:right;"><strong>${eventName}</strong></td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#94a3b8;">Transaction ID</td>
              <td style="padding:6px 0; text-align:right;"><strong>${transactionId}</strong></td>
            </tr>
          </table>
        </div>
        <div style="margin:26px 0; padding:18px; border-radius:14px; background:#022c22; border:1px solid #14532d; text-align:center;">
          <p style="margin:0 0 10px; font-size:15px; color:#ffffff;"> Join the official WhatsApp group for updates</p>
          <a href="https://chat.whatsapp.com/LbjF1AivyB3IJFwFhF3ZG9" target="_blank" style="display:inline-block; padding:10px 18px; background:#22c55e; color:#022c22; text-decoration:none; font-weight:bold; border-radius:999px;">Join WhatsApp Group</a>
        </div>

        <p style="font-size:15px; line-height:1.6;">
          Please retain this email for your records. You may be required to present
          this confirmation (digital or printed) during event check-in.
        </p>

        <p style="font-size:15px; line-height:1.6;">
          Further details regarding the event schedule, venue, reporting time, and
          instructions will be communicated via email and official channels.
        </p>

        <p style="margin-top:26px; font-size:15px;">
          We look forward to welcoming you and wish you a rewarding experience at
          <strong>PRAVAHA 2K26</strong>.
        </p>

        <p style="margin-top:34px; font-size:13px; color:#94a3b8; text-align:center;">— Team PRAVAHA 2K26<br/>RGMCET</p>
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
      subject: "PRAVAHA 2K26 | Transaction Rejected",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#050814; font-family:Arial, Helvetica, sans-serif;">
    <div style="padding:28px;">
      <div style="max-width:620px; margin:auto; background:#0b1025; border-radius:18px; padding:32px; color:#ffffff;">
        
        <div style="text-align:center;">
          <h1 style="margin:0; color:#f87171; letter-spacing:1px;">PRAVAHA 2K26</h1>
          <p style="margin-top:6px; color:#94a3b8; font-size:13px;">Transaction Update</p>
        </div>

        <hr style="border:none; border-top:1px solid #1e293b; margin:26px 0;" />

        <p style="font-size:15px;">Dear <strong>${fullName}</strong>,</p>
        <p style="font-size:15px; line-height:1.6;">
          We regret to inform you that your transaction for the <strong>PRAVAHA event</strong> has been
          <strong style="color:#ef4444;">rejected</strong>.
        </p>
        <p style="font-size:15px; line-height:1.6;">
          If this was unintentional, you may register again by submitting a valid payment screenshot and correct transaction details.
        </p>

        <div style="margin-top:30px; padding:20px; background:#020617; border:1px solid #1e293b; border-radius:14px;">
          <p style="margin-top:0; color:#22d3ee; font-size:14px; font-weight:bold;">Need help? Contact our coordinators:</p>
          
          <table width="100%" cellspacing="0" cellpadding="0" style="font-size:13px; color:#cbd5e1; line-height:1.5;">
            <tr>
              <td width="50%" style="padding-bottom:15px; vertical-align:top;">
                <strong>S. MD. Arif</strong><br/>
                III EEE (23091A0209)<br/>
                9398875293<br/>
                sh040293@gmail.com
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:15px; vertical-align:top;">
                <strong>S. MD. Umar Farook</strong><br/>
                III (24095A0218)<br/>
                9014185582<br/>
                umarshaik2208@gmail.com
              </td>
            </tr>
            <tr>
              <td width="50%" style="vertical-align:top;">
                <strong>K. Arshad</strong><br/>
                III EEE (24095A0203)<br/>
                8179479455<br/>
                kattubadiarshad@gmail.com
              </td>
            </tr>
          </table>
        </div>

        <p style="margin-top:26px; font-size:15px;">
          We look forward to resolving this and seeing you at 
          <strong>PRAVAHA 2K26</strong>.
        </p>

        <p style="margin-top:34px; font-size:13px; color:#94a3b8; text-align:center;">
          — Team PRAVAHA 2K26<br/>
          RGMCET
        </p>
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