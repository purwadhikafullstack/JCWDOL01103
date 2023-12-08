const db = require("../models");

const assignAdminWarehouse = async (req, res) => {
  const { id, warehouse_id } = req.body;
  try {
    const admin = await db.Users.findOne({
      where: {
        id: id,
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
        user_id: id,
      },
      defaults: {
        user_id: id,
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
            user_id: id,
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

module.exports = { assignAdminWarehouse };
