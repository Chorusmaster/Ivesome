import express from 'express';
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import path from 'node:path';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "storage"))
);

app.use("/api", routes);
app.use(errorHandler);

export default app;