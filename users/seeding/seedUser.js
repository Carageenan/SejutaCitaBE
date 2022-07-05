const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const { makeHash } = require("../helpers/bcrypt");

async function main() {
  await prisma.$connect();

  const data = JSON.parse(fs.readFileSync("../data/users.json", "utf8"));
  data.forEach((el) => {
    el.password = makeHash(el.password);
  });

  await prisma.user.createMany({
    data,
  });

  const allUser = await prisma.user.findMany();
  console.log(allUser);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
