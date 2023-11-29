const express = require("express")
const { addressController } = require("./../controllers/addressController")
const router = express.Router()

router.get("/address", addressController.getAddresses)
router.get("/form-address/:addressId", addressController.getAddressesById)
router.get("/address/:addressId", addressController.getAddressesById)
router.post("/address", addressController.createAddress)
router.put("/form-address/:address_id", addressController.updateAddress)
router.delete("/address/:address_id", addressController.deleteAddress)

module.exports = router
