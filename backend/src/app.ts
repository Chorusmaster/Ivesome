import express from 'express';
import cors from "cors";
import routes from "./routes/index.js";
import { connectDatabase } from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectDatabase();

export default app;