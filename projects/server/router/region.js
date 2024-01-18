const express = require("express");
const router = express.Router();
const regionController = require("../controllers/region")

router.get("/provinces", regionController.getProvinces);
router.get("/provinces/:id", regionController.getProvince);
router.get("/cities/:id", regionController.getCities)
router.get("/cities" , regionController.getCity)

module.exports = router;