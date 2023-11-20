const db = require("./../models")
const user = db.user
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userController = {
  createUser: async (req, res) => {
    const { name, email, username, password, confPassword, address, role } =
      req.body
    if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password must the same !" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    try {
      await user.create({
        name: name,
        email: email,
        username: username,
        password: hashPassword,
        address: address,
        role: role,
      })
      res.status(201).json({ msg: "Successfully register" })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body
    const userLogin = await user.findOne({
      where: {
        username,
      },
    })
    if (!userLogin)
      return res.status(404).json({ msg: "User or Password are incorrect" })
    const match = await bcrypt.compare(password, userLogin.password)
    if (!match)
      return res.status(400).json({ msg: "User or Password are incorrect" })
    let payload = { id: userLogin.user_id, role: userLogin.role }
    const token = jwt.sign(payload, "tokenaja", {
      expiresIn: "1h",
    })
    req.token = token
    const userID = userLogin.user_id
    const name = userLogin.name
    const email = userLogin.email
    const role = userLogin.role
    res.status(200).json({ userID, name, email, role })
  },
}

module.exports = { userController }
