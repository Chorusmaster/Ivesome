import { makeUser } from "../features/auth/user.factory.js";
import { User } from "../models/User.model.js";

export async function seedUsers() {
  await User.deleteMany({});

  await User.insertMany(
      await Promise.all(
        Array.from({ length: 10 }, async () => {
          return makeUser({password: "password"});
        })
      )
    );
}