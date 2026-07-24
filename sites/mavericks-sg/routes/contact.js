import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// Input validation helper
const validateContactInput = ({ name, email, subject, message }) => {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');
  return errors;
};

// Create transporter (lazy so env vars are loaded)
const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const errors = validateContactInput({ name, email, subject, message });
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    // In dev mode, log instead of sending
    if (process.env.NODE_ENV !== 'production' || !process.env.SMTP_USER) {
      console.log('\n📬 Contact form submission:');
      console.log(`   Name:    ${name}`);
      console.log(`   Email:   ${email}`);
      console.log(`   Phone:   ${phone || 'N/A'}`);
      console.log(`   Subject: ${subject || 'N/A'}`);
      console.log(`   Message: ${message}\n`);
      return res.json({ success: true, message: 'Thanks, we will get back to you as soon as we can.' });
    }

    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"Mavericks Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || 'people@mavericks-consulting.com',
      replyTo: email,
      subject: `[Website Enquiry] ${subject || 'New Contact Form Submission'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1a2340;border-bottom:3px solid #00b4c8;padding-bottom:12px">New Enquiry from Website</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Subject</td><td style="padding:8px 0">${subject || '—'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:20px;background:#f8fafc;border-left:3px solid #00b4c8">
            <p style="margin:0;color:#333;white-space:pre-wrap">${message}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#999">Sent via mavericks-consulting.com contact form</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Thanks, we will get back to you as soon as we can.' });
  } catch (err) {
    next(err);
  }
});

export default router;
