const express = require("express");
const { profileController } = require("../controllers/profile");
const { multerUpload } = require("../middlewares/multer");
const router = express.Router();

router.get("/profile/:id", profileController.getProfile);
router.put("/profile/:id/name", profileController.updateName);
router.put(
  "/profile/:id/image",
  multerUpload.single("image"),
  profileController.updateImage
);
router.put("/profile/:id/password", profileController.updatePassword);

module.exports = router;
