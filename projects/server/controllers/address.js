const db = require("../models");
const { encryptData, decryptData } = require("../helpers/encrypt");
const { Op } = require("sequelize");

const createAddress = async (req, res) => {
  const { city_id, name, street } = req.body;
  let latitude = req.geometry.lat;
  let longitude = req.geometry.lng;
  const user_id = req.user.id;
  try {
    const address = await db.Addresses.findOne({
      where: { user_id: user_id },
    });
    await db.Addresses.create({
      user_id: user_id,
      city_id: city_id,
      name: name,
      street: street,
      latitude: latitude,
      longitude: longitude,
      is_primary: address ? false : true,
    });
    return res.status(200).json({
      message: "Create Address Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create Address Failed",
      error: error.toString(),
    });
  }
};
const getAddresses = async (req, res) => {
  const { search } = req.query;
  let whereClause = {};
  if (search) {
    whereClause = {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          "$region.city_name$": {
            [Op.like]: `%${search}%`,
          },
        },
        {
          "$region.province.province_name$": {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };
  }

  try {
    const result = await db.Addresses.findAll({
      where: { [Op.and]: [{user_id: req.user.id}, whereClause] },
      include: {
        model: db.Cities,
        as: "region",
        attributes: {
          exclude: ["province_id"],
        },
        include: {
          model: db.Provinces,
          as: "province",
        },
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt", "deletedAt"],
      },
      order: [
        ["is_primary", "DESC"],
        ["updatedAt", "DESC"],
      ],
    });

    const encryptedResult = result.map((address) => {
      const encryptedAddress = { ...address.dataValues };
      encryptedAddress.id = encryptData(encryptedAddress.id);
      return encryptedAddress;
    });
    return res.status(200).json({
      message: "Get address success",
      data: encryptedResult,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get address failed",
      error: error.toString(),
    });
  }
};

const getAddress = async (req, res) => {
  const { id } = req.params;
  try {
    let decryptedId = decryptData(id);
    const address = await db.Addresses.findOne({
      where: {
        id: decryptedId,
      },
    });
    if (!address) {
      return res.status(400).json({
        message: "Address not found",
      });
    }
    return res.status(200).json({
      message: "Get address success",
      data: {
        ...address.dataValues,
        id: encryptData(address.id),
        user_id: encryptData(address.user_id),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get address failed",
      error: error.toString(),
    });
  }
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { city_id, name, street } = req.body;
  const decryptedId = decryptData(id);
  try {
    const address = await db.Addresses.findByPk(decryptedId);
    if (!address) {
      return res.status(400).json({
        message: "Address not found",
        error: error.toString(),
      });
    }
    await address.update({
      city_id: city_id,
      name: name,
      street: street,
    });
    return res.status(200).json({
      message: "Update Address Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update address failed",
      error: error.toString(),
    });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  let decryptedId = decryptData(id);
  try {
    const address = await db.Addresses.findByPk(decryptedId);
    if (!address) {
      return res.status(400).json({
        message: "Address not found",
        error: error.toString(),
      });
    }
    await address.destroy();
    return res.status(200).json({
      message: "Delete Address Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete Address failed",
      error: error.toString(),
    });
  }
};

const setPrimaryAddress = async (req, res) => {
  const { id } = req.body;
  try {
    let decryptedId = decryptData(id);
    console.log(req.user_id);
    await db.Addresses.update(
      { is_primary: false },
      {
        where: {
          user_id: req.user.id,
          is_primary: true
        },
      }
    );
    await db.Addresses.update(
      { is_primary: true },
      {
        where: {
          id: decryptedId,
        },
      }
    );
    return res.status(200).json({
      message: "Set Primary Address Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Set Primary Address failed",
      error: error.message.toString(),
    });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
};
