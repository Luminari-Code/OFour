import nodemailer from 'nodemailer';

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'reachout.ofour@gmail.com',
    pass: 'qpxtlqjottsszlrc',
  },
};

export const transporter = nodemailer.createTransport(smtpConfig);
