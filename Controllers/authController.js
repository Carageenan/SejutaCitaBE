const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createToken } = require("../helpers/jwt");
const { comparePass } = require("../helpers/bcrypt");

class Controller {
  static async loginUser(req, res, next) {
    try {
      await prisma.$connect();
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }
      const validate = comparePass(req.body.password, user.password);
      if (!validate) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }
      const payload = {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        message: "Success login",
        data: access_token,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

module.exports = Controller;
