import { getRajaOngkirData } from "../api/api"

const rajaOngkirController = {
  getProvince: async (req, res) => {
    try {
      const { name } = req.query
      const query = name ? `province${name}` : ""
      const provinces = await getRajaOngkirData(query, "province")
      res.status(200).json(provinces)
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal Server Error : ${error.message}` })
    }
  },
  getCity: async (req, res) => {
    try {
      const { name } = req.query
      const query = name ? `cities${name}` : ""
      const cities = await getRajaOngkirData(query, "city")
      res.status(200).json(cities)
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal Server Error : ${error.message}` })
    }
  },
}

module.exports = { rajaOngkirController }
