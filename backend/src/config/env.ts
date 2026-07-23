import dotenv from "dotenv";

dotenv.config();
const result = dotenv.config();
console.log(result);

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI!,
  //jwtSecret: process.env.JWT_SECRET!,
};