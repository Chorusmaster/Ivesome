import { ApiError } from "../types/error.types.js";

export function getParam(value: unknown, name: string) {
  if (!value || typeof value !== "string") {
    throw new ApiError(422, `Invalid ${name}`);
  }
  return value;
}