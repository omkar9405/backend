const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // secureConnection:true,
  // port: 587,
  port: 465,
  secure: true,
  tls: {
      ciphers: 'SSLv3'
  },
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = { transporter };