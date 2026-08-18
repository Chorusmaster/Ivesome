import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { USER_ROLE_VALUES, USER_STATUS_VALUES } from "../user/user.types.js";
import type { UserRole, UserStatus } from "../user/user.types.js";

type UserFactoryOverrides = Partial<{
  login: string,
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}>;

export async function makeUser(overrides: UserFactoryOverrides = {}) {
  const password = overrides.password ?? faker.internet.password();

  return {
    login: overrides.login ?? faker.internet.username(),
    email: overrides.email ?? faker.internet.email(),
    passwordHash: await bcrypt.hash(password, 10),
    role: overrides.role ?? faker.helpers.arrayElement(USER_ROLE_VALUES),
    status: overrides.status ?? faker.helpers.arrayElement(USER_STATUS_VALUES),
  };
}
