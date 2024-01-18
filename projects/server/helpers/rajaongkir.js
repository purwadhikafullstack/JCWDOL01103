const axios = require("axios");

const getShippingCost = async (origin, destination, weight, courier) => {
  const API_KEY = process.env.RAJAONGKIR_API_KEY;
  const url = "https://api.rajaongkir.com/starter/cost";

  const data = new URLSearchParams({
    origin,
    destination,
    weight,
    courier,
  });

  const headers = {
    key: API_KEY,
    "content-type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { getShippingCost };
