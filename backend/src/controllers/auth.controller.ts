import type { Request, Response } from "express";

export const login = (
  req: Request,
  res: Response
) => {
  res.json({
    message: "Login"
  });
};

export const register = (
  req: Request,
  res: Response
) => {
  res.json({
    message: "Register"
  });
};

export const profile = (
  req: Request,
  res: Response
) => {
  res.status(204).send();
};