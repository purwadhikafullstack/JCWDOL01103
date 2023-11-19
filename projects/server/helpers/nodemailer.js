const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xordyzen@gmail.com",
    pass: "aendttvhzxnuxlzl",
  },
  tls:{
    rejectUnauthorized: false
  }
});

module.exports = transporter