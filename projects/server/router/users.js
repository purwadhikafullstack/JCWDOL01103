const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

router.get(
  "/users",
  checkRole(["admin", "master"]),
  usersController.getUsers
);

module.exports = router;
