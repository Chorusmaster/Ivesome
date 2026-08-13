import { makeUser } from "../features/user/user.factory.js";
import { createUsers, deleteAllUsers } from "../features/user/user.repository.js";

export async function seedUsers() {
  await deleteAllUsers();

  await createUsers(
    await Promise.all(
      Array.from({ length: 10 }, async () => {
        return makeUser({ password: "password" });
      }),
    ),
  );
}
