const db = require("./../models")
const user = db.user
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userController = {
  createUser: async (req, res) => {
    const { name, email, username, password, confPassword, address } = req.body
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
      })
      res.status(201).json({ msg: "Successfully register" })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  updateAddress: async (req, res) => {
    try {
      const { address, password, confPassword } = req.body
      if (!address) {
        return res.status(400).json({ msg: "Address is required" })
      }

      if (typeof address !== "string") {
        return res.status(400).json({ msg: "Address must be a string" })
      }

      const max_address_length = 100
      if (address > max_address_length) {
        return res.status(400).json({
          msg: "Address is too long",
        })
      }

      if (password !== confPassword) {
        return res
          .status(400)
          .json({ msg: "Password and Confirm Password must be the same" })
      }

      const updateAddress = await user.findOne({
        where: {
          user_id: req.params.id,
        },
      })

      if (!updateAddress) return res.status(404).json({ msg: "User not found" })

      let hashPassword
      if (password === null || password === "") {
        hashPassword = password
      } else {
        const salt = await bcrypt.genSalt(10)
        hashPassword = await bcrypt.hash(password, salt)
      }
      await user.update(
        {
          password: hashPassword,
          address: address,
        },
        {
          where: {
            user_id: req.params.id,
          },
        }
      )
      res.status(200).json({ msg: "Successfully updated address" })
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
  },
}

module.exports = { userController }
