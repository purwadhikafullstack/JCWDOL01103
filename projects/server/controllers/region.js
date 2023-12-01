const db = require("../models");

const getProvince = async (req, res) => {
  const { id } = req.params;
  try {
    const province = await db.Provinces.findOne({
      where: {
        province_id: id,
      },
    });
    return res.status(200).json({
      message: "Get Province Successfully",
      data: province,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Province Failed",
      error: error.toString(),
    });
  }
};

const getProvinces = async (req, res) => {
  try {
    const provinces = await db.Provinces.findAll();
    return res.status(200).json({
      message: "Get Provinces Successfully",
      data: provinces,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Provinces Failed",
      error: error.toString(),
    });
  }
};

const getCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await db.Cities.findOne({
      where: {
        city_id: id,
      },
    });
    return res.status(200).json({
      message: "Get Province Successfully",
      data: city,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Province Failed",
      error: error.toString(),
    });
  }
};

const getCities = async (req, res) => {
  const { id } = req.params;
  try {
    const cities = await db.Cities.findAll({
      where: {
        province_id: id,
      },
    });
    return res.status(200).json({
      message: "Get Cities Successfully",
      data: cities,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get Cities Failed",
      error: error.toString(),
    });
  }
};

module.exports = { getProvince, getProvinces, getCity, getCities };
