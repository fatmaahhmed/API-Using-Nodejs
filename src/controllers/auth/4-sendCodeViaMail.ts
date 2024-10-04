require("dotenv").config();

import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD,
  },
});
export const SendingCode = async (code: number, email: any) => {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: `Reset Password Verification Code`,
    text: `Your verification code is ${code} `,
  });
};
