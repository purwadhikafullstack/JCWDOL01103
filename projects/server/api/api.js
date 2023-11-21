const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const getGeolocation = async (address) => {
  const apiKey = process.env.OPENCAGE_API

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`

  try {
    const response = await axios.get(apiUrl)
    const { results } = response.data

    if (results.length > 0) {
      const { lat, lng } = results[0].geometry
      return { latitude: lat, longitude: lng }
    } else {
      throw new Error("No results found for the address.")
    }
  } catch (error) {
    console.error("Error getting geolocation:", error.message)
    throw new Error("Failed to retrieve geolocation data.")
  }
}

const getLocation = async (geolocation) => {
  const apiKey = process.env.OPENCAGE_API

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${geolocation}&key=${apiKey}`

  try {
    const response = await axios.get(apiUrl)
    const { results } = response.data

    if (results.length > 0) {
      // console.log("Full results", results[0])
      const { country } = results[0].components
      return { country }
    } else {
      throw new Error("No results found for the address.")
    }
  } catch (error) {
    console.error("Error getting geolocation:", error.message)
    throw new Error("Failed to retrieve geolocation data.")
  }
}

const getRajaOngkirData = async (query, type) => {
  const apiKey = process.env.RAJAONGKIR_API
  const apiUrl = `https://api.rajaongkir.com/starter/${type}?key=${apiKey}&${query}`

  try {
    const response = await axios.get(apiUrl)
    const results = response.data.rajaongkir.results
    return results
  } catch (error) {
    console.error("Error getting RajaOngkir data: ", error.message)
    throw error
  }
}

module.exports = { getGeolocation, getLocation, getRajaOngkirData }
