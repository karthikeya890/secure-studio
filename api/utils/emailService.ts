import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export const sendEmail = async (to: string, subject: string, text: string, html: string): Promise<void> => {
  const data = {
    from: `Audio pen demo <no-reply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN || '', data);
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
};
