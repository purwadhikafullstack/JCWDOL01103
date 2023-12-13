const db = require("../models");
const user = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const profileController = {
  getProfile: async (req, res) => {
    try {
      const profile = await user.findOne({
        attributes: { exclude: ["password", "role"] },
        where: {
          user_id: req.params.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "Request was successfull",
        error: null,
        data: profile,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  },

  updateName: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (typeof name !== "string") {
      return res.status(400).json({ message: "Name must be a string" });
    }

    try {
      const findUser = await user.findOne({
        where: {
          user_id: req.params.id,
        },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateName = await user.update(
        { name: name },
        {
          where: {
            user_id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Name Successfully Updated",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Name Update Failed",
        error: e.toString(),
      });
    }
  },

  updateImage: async (req, res) => {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    try {
      const findUser = await user.findOne({
        where: {
          user_id: req.params.id,
        },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateImage = await user.update(
        { image: image.filename },
        {
          where: {
            user_id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Image Successfully Updated",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Image Update Failed",
        error: e.toString(),
      });
    }
  },

  updatePassword: async (req, res) => {
    const { oldPassword, newPassword, confNewPassword } = req.body;

    try {
      const findUser = await user.findOne({
        where: {
          user_id: req.params.id,
        },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        findUser.password
      );

      if (!isOldPasswordValid) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      if (newPassword !== confNewPassword) {
        return res
          .status(400)
          .json({ message: "Password and Confirm Password must the same !" });
      }

      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(newPassword, salt);

      const updatePassword = await user.update(
        { password: hashPassword },
        {
          where: {
            user_id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Password Successfully Updated",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Change Password Failed",
        error: e.toString(),
      });
    }
  },
};

module.exports = { profileController };
