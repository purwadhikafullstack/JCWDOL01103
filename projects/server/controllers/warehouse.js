const db = require("../models");
const { Op } = require("sequelize");

const getWarehouse = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await db.Warehouses.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.Cities,
        as: "region",
        include: {
          model: db.Provinces,
          as: "province",
        },
      },
    });
    return res.status(200).json({
      message: "Get Warehouse Successfully",
      data: warehouse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Warehouse Failed",
      error: error.toString(),
    });
  }
};

const getWarehouses = async (req, res) => {
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  let whereClause2 = {};
  let sortType = [["updatedAt", "DESC"]];
  if (query.province_id) {
    whereClause2["$region.province.province_id$"] = query.province_id;
  }
  if (query.search) {
    whereClause = {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${query.search}%`,
          },
        },
        {
          "$region.city_name$": {
            [Op.like]: `%${query.search}%`,
          },
        },
      ],
    };
  }

  if (query.sort) {
    const filter = query.sort.split("_");
    sortType[0] = filter;
  }
  try {
    const { count, rows } = await db.Warehouses.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: sortType,
      where: { [Op.and]: [whereClause2, whereClause] },
      attributes: {
        exclude: ["city_id"],
      },
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
    });
    const totalPages = Math.ceil(count / pageSize);
    const warehouseRow = await rows.map((warehouse, index) => {
      return {
        indexNumber: offset + index + 1,
        ...warehouse.toJSON(),
      };
    });
    const result = {
      totalWarehouse: count,
      totalPages: totalPages,
      currentPage: page,
      warehouses: warehouseRow,
    };
    if (!rows) {
      return res.status(400).json({
        message: "Get Warehouse Failed",
        error: error.toString(),
      });
    }
    return res.status(200).json({
      message: "Get Warehouse Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Warehouse Failed",
      error: error.toString(),
    });
  }
};

const createWarehouse = async (req, res) => {
  const { name, city_id, street } = req.body;
  try {
    let latitude = req.geometry.lat;
    let longitude = req.geometry.lng;
    const result = await db.Warehouses.create({
      name: name,
      city_id: city_id,
      street: street,
      latitude: latitude,
      longitude: longitude,
    });
    return res.status(200).json({
      message: "Create Warehouse Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create Warehouse Failed",
      error: error.toString(),
    });
  }
};

const updateWarehouse = async (req, res) => {
  const params = req.params;
  const data = req.body;
  try {
    const warehouse = await db.Warehouses.findByPk(params.id);
    if (!warehouse) {
      return res.status(400).json({
        message: "Warehouse not found",
        error: error.toString(),
      });
    }
    await warehouse.update({
      name: data.name,
      city_id: data.city_id,
      street: data.street,
    });
    return res.status(200).json({
      message: "Update Warehouse Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update warehouse failed",
      error: error.toString(),
    });
  }
};

const deleteWarehouse = async (req, res) => {
  const params = req.params;
  try {
    const warehouse = await db.Warehouses.findByPk(params.id);
    if (!warehouse) {
      return res.status(400).json({
        message: "Warehouse not found",
        error: error.toString(),
      });
    }
    await warehouse.destroy();
    return res.status(200).json({
      message: "Delete Warehouse Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete warehouse failed",
      error: error.toString(),
    });
  }
};

module.exports = {
  getWarehouse,
  createWarehouse,
  getWarehouses,
  updateWarehouse,
  deleteWarehouse,
};
