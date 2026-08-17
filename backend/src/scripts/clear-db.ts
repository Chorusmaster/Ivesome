import { prisma } from "../config/database.js";

async function clearDatabase() {

  await Promise.all([
    prisma.user.deleteMany(),
    prisma.refreshSession.deleteMany(),
    prisma.authToken.deleteMany(),
    prisma.project.deleteMany(),
  ]);

  console.log("Database cleared");
}

clearDatabase();