const express = require("express")
const { userController } = require("./../controllers/userController")
const router = express.Router()

router.post("/users", userController.createUser)
router.patch("users/:id", userController.updateAddress)
