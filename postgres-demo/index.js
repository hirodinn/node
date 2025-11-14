import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json()); // Parses incoming JSON bodies

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
