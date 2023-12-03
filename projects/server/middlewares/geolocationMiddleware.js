const db = require("../models");
const axios = require("axios");

const getGeoLocation = async (req, res, next) => {
  const { city_id } = req.body;
  try {
    const cities = await db.Cities.findOne({
      // raw:true,
      where: {
        city_id: city_id,
      },
      include: {
        model: db.Provinces,
        as: "province",
      },
    });
    if (!cities) {
      return res.status(400).json({
        status: 400,
        message: "City not found",
      });
    }
    const city = cities.city_name;
    const province = cities.province.province_name;
    const result = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city},${province}&key=d9720b80851846c8ab798fc76d73aeb4&language=id&no_annotations=1&pretty=1`
    );
    const locationConfidence = result.data.results.reduce((highest, current) =>
      current.value > highest.value ? current : highest
    );
    req.geometry = locationConfidence.geometry;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  getGeoLocation,
};
