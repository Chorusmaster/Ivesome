import type { Request, Response } from "express";
import { registerUser } from "./auth.service.js";

export const login = async (req: Request, res: Response) => {
  res.json({
    message: "Login",
  });
};

export const register = async (req: Request, res: Response) => {
  await registerUser(req.body);
  res.json({
    message: "Registration was successful",
  });
};

export const profile = (req: Request, res: Response) => {
  res.status(204).send();
};
