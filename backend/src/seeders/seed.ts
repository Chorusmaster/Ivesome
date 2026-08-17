import { seedUsers } from "./user.seeder.js";
//import { seedIdeas } from "./idea.seeder.js";

async function runSeed() {
  console.log("Seeding users...");
  await seedUsers();
  //console.log("Seeding ideas...");
  //await seedIdeas();

  console.log("Seeding completed.");
}

runSeed();