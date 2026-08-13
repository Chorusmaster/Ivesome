export interface CreateUserData {
  email: string;
  passwordHash: string;
  role: UserRole;
  isBlocked: boolean;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}