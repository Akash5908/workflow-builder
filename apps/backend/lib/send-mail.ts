import nodemailer from "nodemailer";

interface Mail {
  host: string; // e.g., 'smtp.gmail.com'
  user: string; // e.g., 'your@gmail.com'
  pass: string; // App password
  email: string; // Recipient
  subject: string;
  message: string;
}

export const sendMail = async (data: Mail) => {
  if (!data.host || !data.user || !data.email) {
    throw new Error("Missing required SMTP config: host, user, or from");
  }

  const transporter = nodemailer.createTransport({
    pool: true,
    host: data.host,
    port: 465,
    secure: true,
    auth: {
      user: data.user,
      pass: data.pass,
    },
  });

  await transporter.sendMail({
    from: data.user,
    to: data.email,
    subject: data.subject,
    text: data.message,
  });
};
