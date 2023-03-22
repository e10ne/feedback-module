import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
const prisma = new PrismaClient();

const adminPassword = process.env.ADMIN_PASS as string;
const medientPassword = process.env.MEDIENT_PASS as string;

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      password: await argon2.hash(adminPassword),
    },
  });

  await prisma.user.create({
    data: {
      username: "medient",
      password: await argon2.hash(medientPassword),
    },
  });

  await prisma.category.createMany({
    data: [
      { title: "Styling" },
      { title: "Network Errors" },
      { title: "Login Errors" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
