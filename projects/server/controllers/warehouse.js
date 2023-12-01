const db = require("../models");
const {Sequelize, Op} = require("sequelize") 

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
        }
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
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  let whereClauseProvince = {};
  let sortType = [];
  if (query.delete_status) {
    whereClause.delete_status = query.delete_status;
  }
  if (query.province_id) {
    whereClauseProvince.province_id = query.province_id;
  }
  if (query.name) {
    whereClause.name = {
      [Op.like]: `%${query.name}%`,
    };
  }
  if (query.sort) {
    sortType.push(query.sort.split("_"))
  }
  try {
    const { count, rows } = await db.Warehouses.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: whereClause,
      attributes: {
        exclude: ["city_id"]
      },
      order: sortType,
      include: {
        model: db.Cities,
        as: "region",
        where: whereClauseProvince,
        attributes: {
          exclude: ["province_id"]
        },
        include: {
          model: db.Provinces,
          as: "province",
        }
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
      warehouses: warehouseRow
    };
    if (!rows){
      return res.status(400).json({
        message: "Get Warehouse Failed",
        error: error.toString(),
      });
    }
    return res.status(200).json({
      message: "Create Warehouse Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Warehouse Failed",
      error: error.toString(),
    });
  }
}

const createWarehouse = async (req, res) => {
  const { name, city_id, street } = req.body;
  try {
    const result = await db.Warehouses.create({
      name: name,
      city_id: city_id,
      street: street,
    });
    return res.status(200).json({
      message: "Create Warehouse Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Warehouse Failed",
      error: error.toString(),
    });
  }
};

const updateWarehouse = async (req, res) => {
  const params = req.params;
  const data = req.body
  try {
    const warehouse = await db.Warehouses.findByPk(params.id);
    if (!warehouse){
      return res.status(500).json({
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
}

const deleteWarehouse = async (req, res) => {
  result = {
    name: "Antony",
    province: "Jawa Barat"
  }
}

module.exports = { getWarehouse, createWarehouse, getWarehouses, updateWarehouse };
