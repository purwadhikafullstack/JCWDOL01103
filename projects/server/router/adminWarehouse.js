const express = require("express");
const router = express.Router();
const adminWarehouseController = require("../controllers/adminWarehouse")

router.post("/admin-warehouse", adminWarehouseController.assignAdminWarehouse)

module.exports = router

