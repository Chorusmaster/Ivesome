import { AuthPayload } from "../features/auth/auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    };
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    };
  }
}

export {};