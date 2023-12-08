const jwt = require("jsonwebtoken");
const db = require("../models");
const { decryptData } = require("../helpers/encrypt");

// let privilage = {
//   guest: ["/login", "/register", "/verification"],
//   user: [ "/verification", "/users", "/addresses", "/cities", "/provinces", "/warehouses"],
//   admin: ["/verification", "/users", "/addresses", "/cities", "/provinces", "/warehouses"],
//   super: [
//     "/verification",
//     "/users",
//     "/addresses",
//     "/cities",
//     "/provinces",
//     "/warehouses",
//     "/admin-warehouse",
//   ],
// };
const validateApi = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization){
    req.user = {role: 'guest'}
    return next()
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    req.user = {role: 'guest'}
    next()
  }
  jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
    if (err) {
      if(err.expiredAt){
        return res.status(403).send("Token expried")
      }
      return res.status(403).send("Forbidden: Invalid token");
    }
    const decryptedId = decryptData(decoded.id);
    const user = await db.Users.findOne({
      where: {
        id: decryptedId,
      },
    });
    if(user){
      req.user = user;
      next();
    }
    else {
      res.status(403).send("Forbidden");
    }
  });
};

const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    if (req.user && requiredRoles.includes(req.user.role)) {
      next();
    } else {
        if(req.user.role === 'guest'){
            return res.status(401).send("Unauthorized: No token provided");
        }
        return res.status(403).send("Permission denied. You don't have access to this api");
    }
  };
};


module.exports = { validateApi, checkRole };
