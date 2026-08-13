import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { UserRole, UserStatus } from "../user/user.types.js";

type UserFactoryOverrides = Partial<{
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}>;

export async function makeUser(overrides: UserFactoryOverrides = {}) {
  const password = overrides.password ?? faker.internet.password();

  return {
    email: overrides.email ?? faker.internet.email(),
    passwordHash: await bcrypt.hash(password, 10),
    role: overrides.role ?? faker.helpers.arrayElement(Object.values(UserRole)),
    UserStatus: overrides.status ?? faker.helpers.arrayElement(Object.values(UserStatus)),
  };
}
