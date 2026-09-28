import { prisma } from "../config/database.js";

async function clearDatabase() {

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "AuthToken",
      "Comment",
      "Conversation",
      "ConversationMember",
      "Favourite",
      "Message",
      "Notification",
      "ParticipationRequest",
      "Project",
      "ProjectMember",
      "RefreshSession",
      "Report",
      "Settings",
      "Task",
      "Upvote",
      "User",
      "Workspace"
    RESTART IDENTITY CASCADE;
  `);

  console.log("Database cleared");
}

clearDatabase();