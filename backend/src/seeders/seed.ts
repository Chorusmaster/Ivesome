import { seedUsers } from "./user.seeder.js";
import { seedIdeas } from "./idea.seeder.js";
import { connectDatabase, disconnectDatabase } from "../config/database.js";

async function runSeed() {
  await connectDatabase();

  console.log("Seeding users...");
  await seedUsers();
  console.log("Seeding ideas...");
  await seedIdeas();

  console.log("Seeding completed.");
  await disconnectDatabase();
}

runSeed();