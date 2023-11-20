const db = require("../models");
const bcrypt = require("bcrypt");
const {Op} = require('sequelize')

const validatorRegister = async (req, res, next) => {
  const email = req.body.email;
  const isEmailExist = await db.Users.findOne({
    where: { email },
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
        password: {[Op.ne]: null}
      },
    });
    if (!user) {
      return res.status(400).json({
        status: 401,
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match){
      return res.status(401).json({
        code: 401,
        message: "Wrong Password",
      });
    }
    req.userData = user
    next()
  } catch (e) {
    return res.status(400).json({
      message: "Login validation failed",
      error: e.toString(),
    });
  }
};

module.exports = {
  validatorRegister,
  validatorLogin,
};
