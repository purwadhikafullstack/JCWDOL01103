const db = require("./../models");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/nodemailer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { createToken, decodeToken } = require("../helpers/jwt");
const { encryptData, decryptData } = require("../helpers/encrypt");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await db.Users.create({
      email: email.toLowerCase(),
      role: "user",
    });
    let id = encryptData(newUser.id);
    let role = newUser.role;
    let token = createToken({ email, id, role });
    let mail = {
      from: `Admin <xordyzen@gmail.com>`,
      to: `${email}`,
      subject: "Account verification",
      html: `<a href='http://localhost:3000/verification/${token}'>Click here for verify</a>`,
    };
    transporter.sendMail(mail, (errMail, resMail) => {
      if (errMail) {
        return res.status(500).send({
          message: "Email registration failed!",
          success: false,
        });
      }
      return res.status(200).send({
        message: "Check your email to verification!",
        success: true,
      });
    });
    return res.status(200).json({
      message: "Register success",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

const validatorVerification = async (req, res) => {
  const { token } = req.params;
  try {
    const user = decodeToken(token)
    if (!user.data) {
      return res.status(200).json({
        error: user,
        verified: false,
      });
    }
    const checkUser = await db.Users.findOne({
      where: {
        email: user.data.email,
        password: null,
      },
    });
    if (checkUser) {
      return res.status(200).json({
        message: "Email has not been verified",
        verified: false,
      });
    }
    return res.status(200).json({
      message: "Email has been verified",
      verified: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error: error
    });
  }
};

const verification = async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const decryptedId = decryptData(id);
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
        email: email,
        password: null,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User has been verified",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    await db.Users.update(
      {
        name: name,
        password: hashPassword,
        role: "user",
      },
      {
        where: {
          id: decryptedId,
          email: email,
        },
      }
    );
    res.status(200).json({ message: "Verification success" });
  } catch (err) {
    return res.status(500).json({
      message: err.toString(),
      err: err.toString(),
    });
  }
};

const login = async (req, res) => {
  try {
    const { id, email, role } = req.userData;
    const encryptedId = encryptData(id);
    const token = createToken({ id: encryptedId, email, role });
    return res.status(200).json({
      status: 200,
      message: "Login Success",
      token: token,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Login Failed",
      error: e.toString(),
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const decryptedId = decryptData(decodeURIComponent(id));
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
      },
      attributes: ["id", "name", "email", "role", "status"],
    });
    return res.status(200).json({
      status: 200,
      message: "Get user success",
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Login Failed",
      error: e.toString(),
    });
  }
};

const authValidator = async (req, res) => {
  const token = req.params.id;
  try {
    const verify = jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (err) {
        return err;
      }
      return decode;
    });
    return res.status(200).json({
      message: "Authorized",
      data: verify,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized",
      error: err.toString(),
    });
  }
};

const checkTokenStatus = async(req, res, next) => {
  const { token } = req.params;
  try {
    const decodedToken = decodeToken(decodeURIComponent(token));
    return res.status(200).json({
      status: 200,
      message: "Authorized"
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: error
    })
  }
}

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.Users.findOne({
      where: {
        email: email.toLowerCase(),
        role: "user",
      },
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Email is not registered!",
      });
    }
    if (user.status === "reset") {
      return res.status(400).json({
        status: 400,
        message: "Email has requested a password reset",
      });
    }
    await user.update({
      status: "reset",
    });
    let id = encryptData(user.id);
    let token = createToken({ email, id });
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
    transporter.sendMail(mail, (errMail) => {
      if (errMail) {
        return res.status(500).send({
          message: "Send password reset failed!",
          success: false,
        });
      }
      return res.status(200).send({
        message: "Check your email to reset the password!",
        success: true,
      });
    });
    return res.status(200).send({
      message: "Check your email to reset the password!",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.toString(),
    });
  }
};

const setNewPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decodedToken = decodeToken(decodeURIComponent(token));
    const decryptedId = decryptData(decodedToken.data.id);
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
        email: decodedToken.data.email,
        status: "reset",
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found in reseting password list",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await db.Users.update(
      {
        password: hashPassword,
        status: "active",
      },
      {
        where: {
          id: decryptedId,
          email: decodedToken.data.email,
        },
      }
    );
    return res.status(200).json({
      message: "Set new password success",
      data: decodedToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Set new password failed",
      error: error,
    });
  }
};

module.exports = {
  register,
  verification,
  login,
  validatorVerification,
  getUser,
  authValidator,
  checkTokenStatus,
  resetPassword,
  setNewPassword,
};
