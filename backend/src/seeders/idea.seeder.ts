import { makeIdea } from "../features/idea/idea.factory.js";
import { createIdeas, deleteAllIdeas } from "../features/idea/idea.repository.js";
import { getAllUsers } from "../features/user/user.repository.js";

export async function seedIdeas() {
  await deleteAllIdeas();

  let users = await getAllUsers();

  if (!users || users.length === 0) {
    throw new Error("No users found in the database. Please seed users first.");
  }

  await createIdeas(
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