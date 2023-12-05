const jwt = require("jsonwebtoken");
const db = require("../models");

const validateApi = async (req, res, next) => {
  try {
    const whitelist = ["/login"];
    for (let path of whitelist) {
      if (req.path.includes(path)) {
        return next();
      }
    }
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).json({
        code: 403,
        message: "Unauthorized",
        error: "No token provided",
      });
    }

    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_TOKEN);

    if (!user) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized request",
        error: "Invalid token",
      });
      return;
    }

    const userdb = await db.User.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    if (!userdb) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized request",
        error: "Invalid token",
      });
      return;
    }

    if (userdb.isAdmin) {
      const allowedAdminPages = ["/dashboard"];
      if (
        req.path.startsWith("/dashboard/") ||
        allowedAdminPages.includes(req.path)
      ) {
        return next();
      }
    }

    if (!userdb.isAdmin) {
      const allowedCashierPages = ["/home"];
      if (
        allowedCashierPages.includes(req.path) ||
        req.path.startsWith("/products/")
      ) {
        return next();
      }
    }

    return res.status(403).json({
      status: 403,
      message: "Forbidden",
      error: "Access denied for this role",
    });

    next();
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Unauthorized request",
      error: error.toString(),
    });
  }
};

module.exports = validateApi;
