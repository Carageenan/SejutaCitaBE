const errorHandler = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  } else if (error.name === "Error") {
    res.status(400).json({
      message: error.message,
    });
  } else if (error.message === "invalid token") {
    res.status(401).json({
      message: "Invalid token",
    });
  } else if (error.message === "jwt expired") {
    res.status(401).json({
      message: "Token expired",
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = errorHandler;
