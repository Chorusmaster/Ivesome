import { User } from "../models/User.model.js";
import { RefreshSession } from "../models/RefreshSession.model.js";
import { AuthToken } from "../models/AuthToken.model.js";
import { Idea } from "../models/Idea.model.js";
import { connectDatabase, disconnectDatabase } from "../config/database.js";

async function clearDatabase() {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    RefreshSession.deleteMany({}),
    AuthToken.deleteMany({}),
    Idea.deleteMany({}),
  ]);

  console.log("Database cleared");
  await disconnectDatabase();
}

clearDatabase();