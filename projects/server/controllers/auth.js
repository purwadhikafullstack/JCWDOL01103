const db = require("./../models");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/nodemailer");
const { createToken, decodeToken } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await db.Users.create({
      email: email.toLowerCase(),
      role: 'user'
    });
    let user_id = newUser.id;
    let role = newUser.role
    let token = createToken({ email, user_id, role });
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

const validatorVerification = async (req, res, next) => {
  const { token } = req.params;
  const user = decodeToken(token);
  if (!user) {
    return res.status(404).json({
      message: "Invalid token",
      verified: false,
    });
  }
  const checkUser = await db.Users.findOne({
    where: {
      email: user.email,
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
    const user = await db.Users.findOne({
      where: {
        id: id,
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
          id: id,
          email: email,
        },
      }
    );
    res.status(200).json({ message: "Verification success" });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      err: err.toString(),
    });
  }
};

const login = async (req, res) => {
  try {
    const token = createToken(req.userData);
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

module.exports = {
  register,
  verification,
  login,
  validatorVerification,
};
