import nodemailer from "nodemailer";
import { formatRollNumber } from "./google-sheets";

function getTransporter() {
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  // If using Gmail directly
  if (user.endsWith("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  // Fallback SMTP
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendRegistrationEmails(studentData: {
  fullName: string;
  email: string;
  mobile: string;
  qualification: string;
  currentStatus: string;
  address: string;
  leadSource: string;
  selectedCourse?: string;
  referralName?: string;
  rollNumber?: number | string;
}) {
  if (!process.env.SMTP_PASS) {
    console.log("SMTP_PASS not set. Skipping email dispatch for:", studentData.email);
    return;
  }

  try {
    const transporter = getTransporter();
    const formattedRoll = formatRollNumber(studentData.rollNumber);
    const screeningUrl = `https://testriseacademy.com/apply/screening?email=${encodeURIComponent(
      studentData.email
    )}&name=${encodeURIComponent(studentData.fullName)}&mobile=${encodeURIComponent(
      studentData.mobile
    )}&roll=${encodeURIComponent(formattedRoll)}`;

    const candidateHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; color: #0f172a;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #10b981; margin: 0; font-size: 24px; font-weight: 800;">Test Rise Academy</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Candidate Registration & Admission Screening</p>
        </div>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h3 style="color: #15803d; margin: 0 0 8px 0; font-size: 16px;">Application Recorded, ${studentData.fullName}!</h3>
          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">
            Thank you for applying to Test Rise Academy. Your admission registration details have been securely recorded.
            <br/><strong>Roll Number:</strong> <span style="font-family: monospace; color: #047857; font-weight: bold;">${formattedRoll}</span>
          </p>
        </div>

        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 24px 0;">
          <h4 style="margin: 0 0 8px 0; color: #047857; font-size: 15px; font-weight: 800; text-transform: uppercase;">
            Next Step: AI Communication & Screening Assessment
          </h4>
          <p style="font-size: 13.5px; line-height: 1.6; color: #4b5563; margin: 8px 0 16px 0;">
            Please complete your quick 2-minute AI Screening Assessment to finalize your counseling round.
          </p>
          <div style="text-align: center;">
            <a href="${screeningUrl}" style="display: inline-block; background: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-decoration: none;">
              Start AI Screening Test
            </a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Test Rise Admissions" <${process.env.SMTP_USER || "info@testriseacademy.com"}>`,
      to: studentData.email,
      subject: `Application Recorded (${formattedRoll}) - Test Rise Academy`,
      html: candidateHtml,
    });

    // Also notify mentor/admin directly on their Gmail
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: `"Test Rise Portal" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `🚨 New Application: ${studentData.fullName} (${formattedRoll})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
            <h3 style="color: #047857;">New Student Application Received!</h3>
            <p><strong>Candidate:</strong> ${studentData.fullName}</p>
            <p><strong>Email:</strong> ${studentData.email}</p>
            <p><strong>Mobile:</strong> <a href="tel:${studentData.mobile}">${studentData.mobile}</a></p>
            <p><strong>Location:</strong> ${studentData.address || "Online"}</p>
            <p><strong>Qualification:</strong> ${studentData.qualification} (${studentData.currentStatus})</p>
            <p><strong>Roll Number:</strong> <span style="font-family: monospace; font-weight: bold; color: #047857;">${formattedRoll}</span></p>
            <p style="margin-top: 20px;">
              <a href="https://testriseacademy.com/lms/mentor" style="background: #10b981; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Open Mentor Panel
              </a>
            </p>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("sendRegistrationEmails error:", err);
  }
}

export async function sendNewStudentWelcomeEmail(data: {
  studentName: string;
  email: string;
  temporaryPassword: string;
  rollNumber?: number | string;
}) {
  if (!process.env.SMTP_PASS) {
    console.log("SMTP_PASS not set. Skipping welcome email for:", data.email);
    return;
  }

  try {
    const transporter = getTransporter();
    const formattedRoll = formatRollNumber(data.rollNumber);

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
        <h2 style="color: #10b981;">Welcome to Test Rise Academy LMS!</h2>
        <p>Dear ${data.studentName},</p>
        <p>Your student portal account has been created. Here are your credentials:</p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Portal URL:</strong> <a href="https://testriseacademy.com/lms/login">https://testriseacademy.com/lms/login</a></p>
          <p style="margin: 4px 0;"><strong>Roll Number:</strong> <span style="font-family: monospace;">${formattedRoll}</span></p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 4px 0;"><strong>Password:</strong> <span style="font-family: monospace;">${data.temporaryPassword}</span></p>
        </div>
        <p>You can now log in and begin your software testing training!</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Test Rise Mentors" <${process.env.SMTP_USER || "info@testriseacademy.com"}>`,
      to: data.email,
      subject: `Your Test Rise LMS Account Details (${formattedRoll})`,
      html,
    });
  } catch (err) {
    console.error("sendNewStudentWelcomeEmail error:", err);
  }
}
