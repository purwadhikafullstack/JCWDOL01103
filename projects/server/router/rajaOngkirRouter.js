const express = require("express")
const {
  rajaOngkirController,
} = require("./../controllers/rajaOngkirController")
const router = express.Router()

router.get("/province", rajaOngkirController.getProvinces)
router.get("/province/:id", rajaOngkirController.getProvincesById)
router.get("/city", rajaOngkirController.getCities)
router.get("/city/:id", rajaOngkirController.getCitiesById)
router.get("/cities/:id", rajaOngkirController.getCitiesByProvinceId)

module.exports = router
