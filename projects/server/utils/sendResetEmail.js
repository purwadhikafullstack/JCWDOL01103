const transporter = require("../helpers/nodemailer");
const fs = require("fs");
const sendEmailReset = async (token, email) => {
  try {
    const resetLink = `http://localhost:3000/reset/${token}`;
    const templatePath = "./helpers/resetPassword.html";
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const htmlContent = templateContent.replace(/__RESETLINK__/g, resetLink);
    let mail = {
      from: `Admin <xordyzen@gmail.com>`,
      to: `${email}`,
      subject: "Password Reset",
      html: htmlContent,
    };
    await transporter.sendMail(mail)
  } catch (error) {
    throw error
  }
};

module.exports = {sendEmailReset}