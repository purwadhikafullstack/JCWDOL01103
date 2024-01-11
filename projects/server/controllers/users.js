const db = require("../models");
const { Op } = require("sequelize");
const { encryptData, decryptData } = require("../helpers/encrypt");

const getUsers = async (req, res) => {
  try {
    const users = await db.Users.findAll({
      where: {
        role: "user",
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    return res.status(200).json({
      status: 200,
      message: "Get users successfully!",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Get users Failed!",
      error: error,
    });
  }
};

module.exports = { getUsers };
