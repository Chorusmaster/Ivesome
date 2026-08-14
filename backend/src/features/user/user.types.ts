export interface CreateUserData {
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

export const USER_ROLE_VALUES = ["USER", "ADMIN"] as const;
export type UserRole = typeof USER_ROLE_VALUES[number];

export const USER_STATUS_VALUES = ["UNVERIFIED", "ACTIVE", "BLOCKED"] as const;
export type UserStatus = typeof USER_STATUS_VALUES[number];
