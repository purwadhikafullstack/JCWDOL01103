const db = require("./../models");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/nodemailer");
const { sendEmailReset, sendEmailVerification } = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { createToken, decodeToken } = require("../helpers/jwt");
const { encryptData, decryptData } = require("../helpers/encrypt");
const { Op, literal } = require("sequelize");

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
    await sendEmailVerification(encodeURI(token), email);
    return res.status(200).json({
      message: "Register success, Check your email to verify!",
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
    const user = decodeToken(token);
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
      error: error,
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

const requestResetPassword = async (req, res) => {
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
    const tokenReset = await db.Token_Resets.findOne({
      where: {
        user_id: user.id,
        active: true,
        expiredAt: {
          [Op.gte]: new Date(),
        },
      },
    });
    if (tokenReset) {
      return res.status(400).json({
        status: 400,
        message:
          "You have requested a password reset, please check your email!",
      });
    }
    let id = encryptData(user.id);
    let token = createToken({ email, id }, "2h");
    await sendEmailReset(encodeURI(token), email);
    await db.Token_Resets.create({
      user_id: user.id,
      token: token,
      active: true,
      expiredAt: literal(`DATE_ADD(NOW(), INTERVAL 2 HOUR)`),
    });
    return res.status(200).send({
      message: "Email has been sent, check your email to reset the password!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.toString(),
    });
  }
};
const checkTokenStatus = async (req, res) => {
  if (req.isTokenValid) {
    return res.status(200).json({
      status: 200,
      message: "Token Authorized",
    });
  }
};

const setNewPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const decodedToken = decodeToken(decodeURIComponent(token));
    const decryptedId = decryptData(decodedToken.data.id);
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
        email: decodedToken.data.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
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
        transaction: transaction,
      }
    );
    await db.Token_Resets.update(
      { active: false },
      {
        where: {
          token: token,
        },
        transaction: transaction,
      }
    );
    await transaction.commit();
    return res.status(200).json({
      message: "Set new password success",
    });
  } catch (error) {
    await transaction.rollback();
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
  requestResetPassword,
  setNewPassword,
};
