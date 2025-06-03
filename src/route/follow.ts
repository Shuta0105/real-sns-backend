import express from "express";
import { db } from "../db";

const route = express.Router();

route.post("/api/follow", async (req, res) => {
  try {
    const { follower_id, followee_id } = req.body;
    if (follower_id === followee_id) {
      res.status(400).json("自分をフォローできません");
    } else {
      const [rows] = await db.query(
        "INSERT INTO follow (follower_id, followee_id) VALUES (?, ?)",
        [follower_id, followee_id]
      );
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default route;
