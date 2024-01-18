const { getShippingCost } = require("../helpers/rajaongkir");

const checkShippingCost = async (req, res) => {
  const { origin, destination, weight} = req.body;
  try {
    const result = await getShippingCost(origin, destination, weight, "jne")
    return res.status(200).json({
      message: "Get Shipping Cost Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Shipping Cost Failed",
      error: error,
    });
  }
};

module.exports = {checkShippingCost}