const db = require("./../models")
const provinces = db.provinces
const cities = db.cities

const rajaOngkirController = {
  getProvinces: async (req, res) => {
    try {
      const province = await provinces.findAll({
        attributes: ["province_id", "province_name"],
      })
      res.status(200).json(province)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },

  getProvincesById: async (req, res) => {
    try {
      const response = await provinces.findOne({
        where: {
          province_id: req.params.id,
        },
      })
      if (!response)
        return res.status(404).json({ msg: "Provinsi not found !" })
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
  getCities: async (req, res) => {
    try {
      const city = await cities.findAll({
        attributes: ["city_id", "province_id", "city_name", "postal_code"],
      })
      res.status(200).json(city)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },

  getCitiesById: async (req, res) => {
    try {
      const response = await cities.findAll({
        where: {
          city_id: req.params.id,
        },
      })
      if (!response)
        return res.status(404).json({ msg: "Provinsi not found !" })
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
  getCitiesByProvinceId: async (req, res) => {
    try {
      const response = await cities.findAll({
        where: {
          province_id: req.params.id,
        },
      })
      if (response.length === 0)
        return res
          .status(404)
          .json({ msg: "No cities found for the province !" })
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
}

module.exports = { rajaOngkirController }
