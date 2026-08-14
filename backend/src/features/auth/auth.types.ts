export const AUTH_TOKEN_TYPE_VALUES = ["EMAIL_VERIFICATION", "PASSWORD_RESET"] as const;
export type AuthTokenType = typeof AUTH_TOKEN_TYPE_VALUES[number];