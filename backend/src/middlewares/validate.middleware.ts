import { ZodType, ZodError, treeifyError } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      if (result.error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: zodErrorsToObject(result.error)
        });
      }
    }

    req.body = result.data;
    next();
  };
}

function zodErrorsToObject(error: ZodError) {
  return Object.fromEntries(
    error.issues.map(issue => [
      issue.path.join("."),
      issue.message
    ])
  );
}