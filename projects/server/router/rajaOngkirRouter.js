const express = require("express")
const {
  rajaOngkirController,
} = require("./../controllers/rajaOngkirController")
const router = express.Router()

router.get("/rajaongkir/province", rajaOngkirController.getProvince)
router.get("/rajaongkir/city", rajaOngkirController.getCity)
// router.get("/rajaongkir/subdistrict", rajaOngkirController.getSubdistrict)

// router.get("/rajaongkir/province", getRajaOngkirData("province"))
// router.get("/rajaongkir/city", getRajaOngkirData("city"))

module.exports = router
