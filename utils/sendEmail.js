const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * sendEmail()
 * Sends an email using SendGrid, with safety overrides in development mode.
 *
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
exports.sendEmail = async (to, subject, html) => {
    try {
        if (!to) throw new Error("Recipient email missing");

        // ✅ Redirect recipient for development safety
        const actualRecipient =
            process.env.NODE_ENV === "production" || process.env.EMAIL_OVERRIDE === "false"
                ? to
                : process.env.DEV_EMAIL;

        const msg = {
            to: actualRecipient,
            from: {
                email: process.env.SENDER_EMAIL,
                name: process.env.SENDER_NAME || "Password Reset App",
            },
            subject,
            html,
        };

        const response = await sgMail.send(msg);
        console.log(`✅ Email sent to ${actualRecipient}`);
        return response;
    } catch (error) {
        console.error("❌ SendGrid Email Failed:", error.response?.body || error.message);
        throw new Error("Email could not be sent");
    }
};
