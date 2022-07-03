const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { makeHash } = require("../helpers/bcrypt");

class Controller {
  static async getUserById(req, res, next) {
    try {
      await prisma.$connect();
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      console.log(user);
      if (!user) {
        throw {
          status: 404,
          message: "User not found",
        };
      }
      res.status(200).json({
        message: "Success get user by id",
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async getMyData(req, res, next) {
    try {
      await prisma.$connect();
      const user = await prisma.user.findUnique({
        where: { id: req.identify.userId },
      });
      res.status(200).json({
        message: "Success get my data",
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async getAllUsers(req, res, next) {
    try {
      await prisma.$connect();
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
        },
      });
      res.status(200).json({
        message: "Success get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async registerUser(req, res, next) {
    try {
      await prisma.$connect();
      const validateEmail = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      console.log(validateEmail);
      if (validateEmail) {
        throw {
          status: 400,
          message: "Email already registered",
        };
      }
      const validateUsername = await prisma.user.findUnique({
        where: { username: req.body.username },
      });
      if (validateUsername) {
        throw {
          status: 400,
          message: "Username already registered",
        };
      }
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: makeHash(req.body.password),
          role: req.body.role,
        },
      });
      res.status(201).json({
        message: "Success register",
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async updateUser(req, res, next) {
    try {
      await prisma.$connect();
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: makeHash(req.body.password),
          role: req.body.role,
        },
      });
      res.status(200).json({
        message: "Success update",
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async deleteUser(req, res, next) {
    try {
      await prisma.$connect();
      const user = await prisma.user.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: "Success delete",
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

module.exports = Controller;

// async function main() {
//   await prisma.$connect();

//   await prisma.user.create({
//     data: {
//       name: "Rich",
//       email: "hello@prisma.com",
//       password: "secret",
//       role: "Admin",
//     },
//   });

//   const allUsers = await prisma.user.findMany();
//   console.dir(allUsers, { depth: null });
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
