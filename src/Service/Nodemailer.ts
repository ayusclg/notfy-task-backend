import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
export interface mail {
  to: string;
  html: string;
  subject: string;
    text: string;

}

dotenv.config()
const user = process.env.EMAIL_USER as string;
const pass = process.env.EMAIL_PASS as string;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});


 const sendMail = async ({ to, html, subject, text }: mail): Promise<string> => {
  const mailOptions = {
    from: user,
    to,
    subject,
    html,
    text,

  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.messageId;
  } catch (error) {
    console.error("Could not send mail:", error);
    throw new Error("Mail sending failed");
  }
};

export {sendMail}