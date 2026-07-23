import { AuthPayload } from "../features/auth/auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};