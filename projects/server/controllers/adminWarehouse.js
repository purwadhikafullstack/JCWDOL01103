const db = require("../models");
const { Op } = require("sequelize");
const { decryptData, encryptData } = require("../helpers/encrypt");

const assignAdminWarehouse = async (req, res) => {
  const { id, warehouse_id } = req.body;
  const decryptedId = decryptData(id);
  try {
    const admin = await db.Users.findOne({
      where: {
        id: decryptedId,
        role: "admin",
      },
    });
    if (!admin) {
      return res.status(400).json({
        message: "This account is not admin!",
      });
    }
    const [user, created] = await db.Warehouses_Users.findOrCreate({
      where: {
        user_id: decryptedId,
      },
      defaults: {
        user_id: decryptedId,
        warehouse_id: warehouse_id,
      },
    });
    if (!created) {
      await db.Warehouses_Users.update(
        {
          warehouse_id: warehouse_id,
        },
        {
          where: {
            user_id: decryptedId,
          },
        }
      );
      return res.status(200).json({
        message: "Set change admin warehouse succesfully!",
      });
    }
    return res.status(200).json({
      message: "Set new admin warehouse succesfully!",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to set Admin Warehouse",
      error: error.toString(),
    });
  }
};

const getAllAdmin = async (req, res) => {
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
            "$user.name$": {
              [Op.like]: `%${search}%`,
            },
          },
          {
            "$warehouse.region.city_name$": {
              [Op.like]: `%${search}%`,
            },
          },
          {
            "$warehouse.region.province.province_name$": {
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
    const {count, rows} = await db.Warehouses_Users.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: sortType,
      where: whereClause,
      order: sortType,
      include: [
        {
          model: db.Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
          },
        },
        {
          model: db.Warehouses,
          as: "warehouse",
          attributes: ["id", "name", "street"],
          include: {
            model: db.Cities,
            as: "region",
            attributes: {
              exclude: ["province_id"],
            },
            include: {
              model: db.Provinces,
              as: "province",
            },
          },
        },
      ],
    });
    const flattenedResults = rows.map((result) => {
      const { id, user, warehouse } = result;
      const { id: warehouseId, name: warehouseName, street, region} = warehouse;
      const { city_id, city_name, postal_code, province } = region;
      const { province_id, province_name } = province;
      return {
        id,
        user:{
          ...user.get(),
          id: encryptData(id),
        },
        warehouse: {
          id: warehouseId,
          province_id,
          city_id,
          name: warehouseName,
          street,
          city_name,
          province_name,
          postal_code,
        },
      };
    });
    const totalPages = Math.ceil(count / pageSize);
    const adminList = await flattenedResults.map((item, index) => {
      return {
        indexNumber: offset + index + 1,
        ...item,
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
      message: "Get Admin Successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Get Admin Failed",
      error: error,
    });
  }
};

const getAdminWarehouse = async (req, res) => {
  const { user_id } = req.params;
  try {
    const whereClause = {};
    if (user_id) {
      let dencodedId = decodeURIComponent(user_id);
      let decryptedId = decryptData(dencodedId);
      whereClause.user_id = decryptedId;
    }
    const admin = await db.Warehouses_Users.findOne({
      where: whereClause,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    const result = admin;
    result.user_id = user_id;
    return res.status(200).json({
      message: "Get admin warehouse succesfully!",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get Admin Warehouse",
      error: error.toString(),
    });
  }
};

module.exports = { assignAdminWarehouse, getAdminWarehouse, getAllAdmin };
