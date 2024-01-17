const db = require("../models");
const { Op } = require("sequelize");
const { encryptData } = require("../helpers/encrypt");

const getUsers = async (req, res) => {
  const { search } = req.query;
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.page_size) || 15;
  const offset = (page - 1) * pageSize;
  try {
    let sortType = [["updatedAt", "DESC"]];
    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }
    if (query.sort) {
      const filter = query.sort.split("_");
      sortType[0] = filter;
    }
    const {count, rows } = await db.Users.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: sortType,
      where: { [Op.and]: [whereClause, {role:"user"}] },
      order: sortType,
      attributes: { exclude: ["password", "createdAt", "updatedAt", "deletedAt", "role"] },
    });
    const totalPages = Math.ceil(count / pageSize);
    const adminList = await rows.map((item, index) => {
      return {
        indexNumber: offset + index + 1,
        ...item.get(),
        id: encryptData(item.id)
      };
    });
    const result = {
      total_result: count,
      total_page: totalPages,
      current_page: page,
      data: adminList,
    };
    return res.status(200).json({
      status: 200,
      message: "Get users successfully!",
      data: result,
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
