const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD
  },
  tls:{
    rejectUnauthorized: false
  }
});

module.exports = transporter