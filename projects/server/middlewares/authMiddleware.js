const db = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { createToken } = require("../helpers/jwt");
const verifyToken = require("../helpers/googleAuth");
const { encryptData } = require("../helpers/encrypt");

const validatorRegister = async (req, res, next) => {
  const email = req.body.email;
  const isEmailExist = await db.Users.findOne({
    where: {
      email: email,
    },
  });
  if (isEmailExist) {
    return res.status(409).json({
      message: "email has been registered",
    });
  }
  next();
};

const validatorLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await db.Users.findOne({
      raw: true,
      where: {
        email: email,
        password: { [Op.ne]: null },
      },
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 400,
        message: "Wrong Password",
      });
    }
    req.userData = user;
    next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Login validation failed",
      error: e.toString(),
    });
  }
};

const authGoogle = async (req, res, next) => {
  const { googleToken } = req.params;
  try {
    const userDecoded = await verifyToken(googleToken);
    if (!userDecoded) {
      return res.status(403).json({
        status: 403,
        message: "Failed",
        error: "Invalid Google Token",
      });
    }
    const user = await db.Users.findOne({
      where: {
        email: userDecoded.email,
      },
    });
    if (!user) {
      const newUser = await db.Users.create({
        name: userDecoded.name,
        email: userDecoded.email.toLowerCase(),
        role: "user",
      });
      let id = encryptData(newUser.id);
      let email = newUser.email;
      let name = newUser.name;
      let role = "user";
      const token = createToken({ id, email, name, role });
      return res.status(200).json({
        status: 200,
        message: "Register & Login Success",
        is_verified: false,
        token: token,
      });
    }
    if (user && !user.password) {
      let id = encryptData(user.id);
      let email = user.email;
      let name = user.name;
      let role = "user";
      const token = createToken({ id, email, name, role });
      return res.status(200).json({
        status: 200,
        message: "Login Success",
        is_verified: false,
        token: token,
      });
    }
    req.userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.toString(),
    });
  }
};

const checkResetToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const resetToken = await db.Token_Resets.findOne({
      where:{
        token: decodeURI(token),
      }
    })
    if(!resetToken){
      return res.status(400).json({
        status: 400,
        message: "Invalid token",
      });
    }
    if(!resetToken.active || resetToken.expiredAt < new Date()){
      return res.status(401).json({
        status: 401,
        message: "Token has expired, please request a new password reset!",
      });
    }
    req.isTokenValid = true
    next()

  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: error,
    });
  }
};

module.exports = {
  validatorRegister,
  validatorLogin,
  authGoogle,
  checkResetToken,
};
