import { makeIdea } from "../features/idea/idea.factory.js";
import { User } from "../models/User.model.js";
import { Idea } from "../models/Idea.model.js";

export async function seedIdeas() {
  await Idea.deleteMany({});

  let users = await User.find();

  if (!users ||users.length === 0) {
    throw new Error("No users found in the database. Please seed users first.");
  }

  await Idea.insertMany(
    await Promise.all(
      Array.from({ length: 10 }, async () => {
        const user = users[Math.floor(Math.random() * users.length)];

        if (!user) {
          throw new Error("No user available");
        }

        return makeIdea({
          authorId: user._id,
        });
      })
    )
  );
}