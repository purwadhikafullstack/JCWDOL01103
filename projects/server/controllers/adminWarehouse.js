const { decryptData, encryptData } = require("../helpers/encrypt");
const db = require("../models");

const assignAdminWarehouse = async (req, res) => {
  const { id, warehouse_id } = req.body;
  const decryptedId = decryptData(id)
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

const getAdminWarehouse = async (req, res) => {
  const {user_id} = req.params
  try {
    const whereClause = {}
    if(user_id){
      let dencodedId = decodeURIComponent(user_id)
      let decryptedId = decryptData(dencodedId)
      whereClause.user_id = decryptedId
    }
    const admin = await db.Warehouses_Users.findOne({
      where: whereClause,
      attributes:{
        exclude: ["createdAt", "updatedAt"]
      }
    })
    if(!admin){
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    const result = admin
    result.user_id = user_id
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
}

module.exports = { assignAdminWarehouse, getAdminWarehouse };
