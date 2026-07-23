import { env } from "./config/env.js";
import app from './app.js';

const port = env.port;

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});