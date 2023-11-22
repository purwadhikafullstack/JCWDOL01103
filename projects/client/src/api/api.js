import axios from "axios"

const getRajaOngkirData = async (query, type) => {
  const apiKey = "48f7a14fe91826bdfc02f20d621013f3"
  //   console.log(apiKey)
  const apiUrl = `https://api.rajaongkir.com/starter/${type}?key=${apiKey}&${query}`

  try {
    const response = await axios.get(apiUrl)
    console.log(response)
    const results = response.data.rajaongkir.results
    return results
  } catch (error) {
    console.error("Error getting RajaOngkir data: ", error.message)
    throw error
  }
}

export default getRajaOngkirData
