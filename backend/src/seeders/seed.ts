import { seedUsers } from "./user.seeder.js";
import { seedProjects } from "./project.seeder.js";

async function runSeed() {
  console.log("Seeding users...");
  await seedUsers();
  console.log("Seeding projects...");
  await seedProjects();

  console.log("Seeding completed.");
}

runSeed();