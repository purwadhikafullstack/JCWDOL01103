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
    check("confirmPassword").notEmpty()
    .custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match with password')
        }
        return true;
    })
  ]),
  authControllers.verification
);
router.post("/login", authMiddlewares.validatorLogin, authControllers.login);
router.post("/login/google/:googleToken", authMiddlewares.authGoogle, authControllers.login)

module.exports = router;
