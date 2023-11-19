const db = require("./../models");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/nodemailer");
const { createToken } = require("../helpers/jwt");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmailExist = await db.Users.findOne({
      where: { email },
    });
    if (isEmailExist) {
      return res.status(409).json({
        message: "email has been registered",
      });
    }
    const newUser = await db.Users.create({
        email: email,
    });
    let userId = newUser.id
    let token = createToken({email, userId})
    let mail = {
        from: `Admin <xordyzen@gmail.com>`,
        to: `${email}`,
        subject: 'Account verification',
        html:`<a href='http://localhost:3000/authentication/${token}'>Click here for verify</a>`
    }
    transporter.sendMail(mail,(errMail, resMail)=>{
        if(errMail){
            console.log(errMail)
            res.status(500).send({
                message:"Email registration failed!",
                success: false
            })
        }
        res.status(200).send({
            message:"Check your email to verification!",
            success: true
        })
    })
    return res.status(200).json({
      message: "Register success",
      data: newUser
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

const verification = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password must the same !",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    await user.update(
      {
        name: name,
        password: hashPassword,
        isAdmin: false,
      },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(201).json({ message: "Successfully register" });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await db.Users.findAll({
      raw: true,
      attribute: ["id", "email"],
    });
    return res.status(200).json({
      status: 200,
      data: result,
      message: "berhasil",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error",
      error: e.toString(),
    });
  }
};
module.exports = { 
    register, 
    verification,
    login
};
