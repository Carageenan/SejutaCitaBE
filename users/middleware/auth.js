const { verifyToken } = require("../helpers/jwt");

const isLogin = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = verifyToken(access_token);
    req.identify = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.identify.role !== "Admin") {
      throw {
        status: 401,
        message: "You are not authorized to access this resource",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isLogin,
};
