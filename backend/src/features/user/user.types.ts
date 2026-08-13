export interface CreateUserData {
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  UNVERIFIED = "UNVERIFIED",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}