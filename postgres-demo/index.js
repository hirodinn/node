import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json()); // Parses incoming JSON bodies

//get

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//port

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
