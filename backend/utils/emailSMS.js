const nodemailer = require('nodemailer');

// Email service
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email service not configured. Email not sent to:', to);
      return { success: false, error: 'Email service not configured' };
    }

    const mailOptions = {
      from: `"Devendra Dhakad" <david@gmail.com>`,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};





const generateVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

const emailTemplates = {
  emailVerification: (name, token) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering! Please click the button below to verify your email address:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/verify-email/${token}" 
           style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
      </div>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${process.env.CLIENT_URL}/verify-email/${token}</p>
      <p>This link will expire in 24 hours.</p>
    </div>
  `,
  
  passwordReset: (name, token) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/reset-password/${token}" 
           style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${process.env.CLIENT_URL}/reset-password/${token}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
    </div>
  `,
  
  welcomeEmail: (name) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #28a745;">Welcome to Our Platform!</h2>
      <p>Hello ${name},</p>
      <p>Your account has been successfully verified! Welcome to our platform.</p>
      <p>You can now access all features of your dashboard.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/dashboard" 
           style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
          Go to Dashboard
        </a>
      </div>
    </div>
  `
};

module.exports = {
  sendEmail,
  generateVerificationToken,
  emailTemplates
};
