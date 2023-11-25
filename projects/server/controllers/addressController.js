const db = require("./../models")
const address = db.address

const addressController = {
  //READ (GET)
  getAddresses: async (req, res) => {
    try {
      const addresses = await address.findAll({
        attributes: [
          "address_id",
          "user_id",
          "province",
          "city",
          "full_address",
        ],
      })
      res.status(200).json(addresses)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },

  //CREATE(POST)
  createAddress: async (req, res) => {
    const data = req.body

    const fields = [
      "province",
      "city",
      "subdistrict",
      "address_name",
      "full_address",
      "postal_code",
      "is_main_address",
    ]

    const missingFields = fields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `You have to fill ${missingFields.join(", ")}` })
    }
    try {
      const createdAddress = await address.create({
        ...data,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      })
      res.json(createdAddress)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  },

  //UPDATE(PUT)
  updateAddress: async (req, res) => {
    const { address_id } = req.params
    const data = req.body

    const fields = [
      "province",
      "city",
      "subdistrict",
      "address_name",
      "full_address",
      "postal_code",
      "is_main_address",
    ]

    const missingFields = fields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `You have to fill ${missingFields.join(", ")}` })
    }
    try {
      const updatedAddress = await address.update(
        {
          ...data,
          is_main_address: data.is_main_address || false,
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        },
        {
          where: { address_id },
        }
      )
      res.json(updatedAddress)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  },

  //DELETE
  deleteAddress: async (req, res) => {
    const { address_id } = req.params

    try {
      const deletedAddress = await address.destroy({
        where: { address_id, deleted_at: null },
      })
      if (!deletedAddress) {
        return res
          .status(404)
          .json({ error: "Address not found or already deleted" })
      }
      res.status(200).json({ msg: "Address has been deleted" })
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  },
}

module.exports = { addressController }
