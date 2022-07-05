require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWTPASS;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  createToken,
  verifyToken,
};
