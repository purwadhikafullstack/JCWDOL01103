const express = require("express");
const router = express.Router();
const adminWarehouseController = require("../controllers/adminWarehouse");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

router.post("/admin-warehouse", checkRole(["master"]), adminWarehouseController.assignAdminWarehouse)

module.exports = router

