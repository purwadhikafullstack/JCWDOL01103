const express = require("express");
const authControllers = require("../controllers/auth");
const authMiddlewares = require("../middlewares/authMiddleware");
const router = express.Router();
const { check, body } = require("express-validator");
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
    check("confirmPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match with password");
        }
        return true;
      }),
  ]),
  authControllers.verification
);
router.post("/login", authMiddlewares.validatorLogin, authControllers.login);
router.post(
  "/login/google/:googleToken",
  authMiddlewares.authGoogle,
  authControllers.login
);
router.get("/users/:id", authControllers.getUser);
router.get("/reset/:token", authMiddlewares.checkResetToken, authControllers.checkTokenStatus)
router.post("/reset", 
  queryValidation([
  body("email").notEmpty()]),
  authControllers.requestResetPassword
);
router.patch("/reset/:token",
queryValidation([
  body("newPassword").notEmpty(),
  body("confirmNewPassword")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password confirmation does not match with password");
      }
      return true;
    }),
]), authMiddlewares.checkResetToken, authControllers.setNewPassword)

module.exports = router;
