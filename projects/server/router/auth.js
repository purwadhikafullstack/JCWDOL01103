const express = require("express");
const authControllers = require("../controllers/auth");
const authMiddlewares = require("../middlewares/authMiddleware");
const router = express.Router();
const { check } = require("express-validator");
const queryValidation = require("../helpers/expressValidator");

router.post(
  "/register",
  authMiddlewares.validatorRegister,
  authControllers.register
);
router.get("/verification/:token", authControllers.validatorVerification);
router.patch(
  "/verification",
  queryValidation([
    check("email").notEmpty(),
    check("name").notEmpty(),
    check("password").notEmpty(),
    check("confirmPassword").notEmpty(),
  ]),
  authControllers.verification
);
router.get("/login", authMiddlewares.validatorLogin, authControllers.login);

module.exports = router;
