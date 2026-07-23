import type { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service.js";

export async function login(
  req: Request,
  res: Response
) {
  const result = await loginUser(
    req.body.email,
    req.body.password
  );

  res.json(result);
}

export async function register(
  req: Request,
  res: Response
) {
  const result = await registerUser(
    req.body.email,
    req.body.password
  );

  res.json(result);
}

export const profile = (req: Request, res: Response) => {
  res.status(204).send();
};
