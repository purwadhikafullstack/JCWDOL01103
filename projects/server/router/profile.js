const express = require("express");
const { profile } = require("../controllers/profile");
const { multerUpload } = require("../middlewares/multer");
const router = express.Router();
const {
  validateApi,
  checkRole,
} = require("../middlewares/apiValidatorMiddleware");

router.get("/profile", validateApi, checkRole(["user"]), profile.getProfile);
router.put(
  "/profile/name",
  validateApi,
  checkRole(["user"]),
  profile.updateName
);
router.put(
  "/profile/image",
  validateApi,
  checkRole(["user"]),
  multerUpload.single("image"),
  profile.updateImage
);
router.put(
  "/profile/password",
  validateApi,
  checkRole(["user"]),
  profile.updatePassword
);

module.exports = router;
