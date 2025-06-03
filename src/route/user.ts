import express from "express";
import { db } from "../db";

const route = express.Router();

route.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT id, username FROM user WHERE id = ?", [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/api/user/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [result] = await db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );

    if ((rows as any[]).length === 0) {
      res.status(401).json("ログイン失敗：ユーザーが見つかりません");
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default route;
