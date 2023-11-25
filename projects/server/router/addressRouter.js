const express = require("express")
const { addressController } = require("./../controllers/addressController")
const router = express.Router()

router.get("/address", addressController.getAddresses)
router.post("/address", addressController.createAddress)
router.put("/address/:address_id", addressController.updateAddress)
router.delete("/address/:address_id", addressController.deleteAddress)

module.exports = router
