import express from "express";
import cors from "cors";

import { pool } from "./db.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend
  })
);
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

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//put

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updated = await pool.query(
      "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
      [name, email, id]
    );
    if (updated.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    if (deleted.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted", user: deleted.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//port

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
