const db = require("../models");
const { Op } = require("sequelize");
const {
  mutationHandler,
  findNearestWarehouse,
  checkNearestWarehouseStock,
} = require("../services/stockMutationService");
const { decryptData } = require("../helpers/encrypt");

const createMutation = async (req, res) => {
  const { from_warehouse_id, to_warehouse_id, products } = req.body;
  try {
    const mutations = products.map((dt) => {
      let decryptedProductId = decryptData(dt.product_id)
      return {
        from_warehouse_id: to_warehouse_id,
        to_warehouse_id: from_warehouse_id,
        product_id: decryptedProductId,
        quantity: dt.quantity,
        status: "waiting",
      };
    });
    const result = await db.Stock_Mutations.bulkCreate(mutations, {transaction: req.transaction});
    await req.transaction.commit();
    return res.status(200).json({
      message: "Create mutations successfully",
      data: result,
    });
  } catch (error) {
    await req.transaction.rollback();
    return res.status(500).json({
      message: "Create mutations failed",
      error: error.toString(),
    });
  }
};

const changeMutationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const mutation = await db.Stock_Mutations.findOne({
      where: {
        id: id,
      },
    });
    if (!mutation) {
      return res.status(404).json({
        message: "Mutation not found",
      });
    }
    await mutationHandler(id, status, transaction);
    await transaction.commit();
    return res.status(200).json({
      message: "Change mutation status successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Change mutation status failed",
      error: error.toString(),
    });
  }
};

const createAutoMutation = async (req, res) => {
  const { from_warehouse_id, products } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const warehouse = await db.Warehouses.findByPk(from_warehouse_id);
    const warehouses = await db.Warehouses.findAll({
      where: {
        id: {
          [Op.not]: from_warehouse_id,
        },
      },
      attributes: ["id", "longitude", "latitude"],
    });
    if (!warehouse) {
      return res.status(400).json({
        message: "Warehouse not found",
      });
    }
    const nearestWarehouse = await findNearestWarehouse(warehouse, warehouses);
    const results = await checkNearestWarehouseStock(
      nearestWarehouse,
      products
    );
    const assistWarehouseStock = results.flatMap((product) =>
      product.warehouses.map((warehouse) => ({
        product_id: product.product_id,
        from_warehouse_id: from_warehouse_id,
        to_warehouse_id: warehouse.id,
        quantity: warehouse.stockAssist,
        status: "auto",
      }))
    );
    const mutations = assistWarehouseStock.filter((item) => item.quantity > 0);
    const mutationList = await db.Stock_Mutations.bulkCreate(mutations, {
      transaction,
    });
    for (const data of mutationList) {
      await mutationHandler(data.id, "auto", transaction);
    }
    await transaction.commit();
    return res.status(200).json({
      message: "Create auto mutations successfully",
      data: mutations
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Create auto mutations failed",
      error: error.toString(),
    });
  }
};

const getMutationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.Stock_Mutations.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.Warehouses,
          as: "from_warehouse",
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
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "city_id"],
          },
        },
        {
          model: db.Warehouses,
          as: "to_warehouse",
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
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "city_id"],
          },
        },
        {
          model: db.Products,
          as: "product",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "deletedAt",
              "description",
              "price",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "from_warehouse_id",
          "to_warehouse_id",
          "product_id",
        ],
      },
    });
    return res.status(200).json({
      message: "Get mutations Succesfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get mutations failed",
      error: error.toString(),
    });
  }
};

const getMutations = async (req, res) => {
  const { search, sort, status, from, to } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  let whereClause2 = {};
  let sortType = [["createdAt", "DESC"]];
  if (search) {
    whereClause = {
      [Op.or]: [
        {
          "$product.product_name$": {
            [Op.like]: `%${search}%`,
          },
        },
        {
          "$to_warehouse.region.city_name$": {
            [Op.like]: `%${search}%`,
          },
        },
        {
          "$to_warehouse.name$": {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };
  }
  if (status) {
    whereClause2.status = status;
  }
  if (from) {
    whereClause2.from_warehouse_id = from;
  }
  if (to) {
    whereClause2.to_warehouse_id = to;
  }
  if (sort) {
    const filter = sort.split("_");
    sortType[0] = filter;
  }
  try {
    const { count, rows } = await db.Stock_Mutations.findAndCountAll({
      where: { [Op.and]: [whereClause, whereClause2] },
      order: sortType,
      include: [
        {
          model: db.Warehouses,
          as: "from_warehouse",
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
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "city_id"],
          },
        },
        {
          model: db.Warehouses,
          as: "to_warehouse",
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
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "city_id"],
          },
        },
        {
          model: db.Products,
          as: "product",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "deletedAt",
              "description",
              "price",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "updatedAt",
          "from_warehouse_id",
          "to_warehouse_id",
          "product_id",
        ],
      },
    });
    const totalPages = Math.ceil(count / pageSize);
    const mutations = await rows.map((mutation, index) => {
      return {
        indexNumber: offset + index + 1,
        ...mutation.toJSON(),
      };
    });
    const results = {
      totalWarehouse: count,
      totalPages: totalPages,
      currentPage: page,
      mutations: mutations,
    };
    if (!rows) {
      return res.status(400).json({
        message: "Get mutations failed",
        error: error.toString(),
      });
    }
    return res.status(200).json({
      message: "Get mutations successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get mutations failed",
      error: error.toString(),
    });
  }
};

module.exports = {
  createMutation,
  getMutationById,
  changeMutationStatus,
  getMutations,
  createAutoMutation,
};
