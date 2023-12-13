const db = require("./../models");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/nodemailer");
const jwt = require("jsonwebtoken");
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
  const decryptedId = id;
  try {
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
      },
      attributes: ["id", "name", "email", "role"],
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
      code: 403,
      message: "Authorized",
      data: verify,
    });
  } catch (error) {
    return res.status(403).json({
      code: 403,
      message: "Unauthorized",
      error: err.toString(),
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
};
