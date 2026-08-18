export interface CreateUserData {
  login: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

export interface RawUpdateUserData {
  login?: string | undefined;
  email?: string | undefined;
  passwordHash?: string | undefined;
  role?: UserRole | undefined;
  status?: UserStatus | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  avatar?: File | undefined;
  location?: string | undefined;
  bio?: string | undefined;
  about?: string | undefined;
  skills?: string | undefined;
  links?: string | undefined;
}

export type UpdateUserData = {
  login?: string | undefined;
  email?: string | undefined;
  passwordHash?: string | undefined;
  role?: UserRole | undefined;
  status?: UserStatus | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  location?: string | undefined;
  bio?: string | undefined;
  about?: string | undefined;
  skills?: string[] | undefined;
  links?: ProfileLink[] | undefined;
  avatarLink?: string | undefined;
};

export const USER_ROLE_VALUES = ["USER", "ADMIN"] as const;
export type UserRole = typeof USER_ROLE_VALUES[number];

export const USER_STATUS_VALUES = ["UNVERIFIED", "ACTIVE", "BLOCKED"] as const;
export type UserStatus = typeof USER_STATUS_VALUES[number];

export interface ProfileLink {
  type: "GITHUB" | "LINKEDIN" | "UNKNOWN"
  link: string
}