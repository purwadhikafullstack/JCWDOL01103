const express = require("express");
const { profile } = require("../controllers/profile");
const { multerUpload } = require("../middlewares/multer");
const router = express.Router();

router.get("/profile/:id", profile.getProfile);
router.put("/profile/:id/name", profile.updateName);
router.put(
  "/profile/:id/image",
  multerUpload.single("image"),
  profile.updateImage
);
router.put("/profile/:id/password", profile.updatePassword);

module.exports = router;
