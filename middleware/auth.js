const { verifyToken } = require("../helpers/jwt");

const isAdmin = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = verifyToken(access_token);
    if (decoded.role !== "Admin") {
      throw {
        status: 401,
        message: "You are not authorized to access this resource",
      };
    }
    req.identify = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
};
