import express from "express";
import { db } from "../db";
import { Like, LikeCount, Post } from "../type";

const route = express.Router();

route.post("/api/post", async (req, res) => {
  try {
    const { user_id, body, image } = req.body;
    const [rows] = await db.query(
      "INSERT INTO post (user_id, body, image) VALUES (?, ?, ?)",
      [user_id, body, image]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.get("/api/post/timeline/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query<Post[]>(
      "SELECT * FROM post WHERE user_id = ?",
      [id]
    );
    const [results] = await db.query<Post[]>(
      "SELECT p.* FROM follow f JOIN post p ON p.user_id = f.followee_id WHERE f.follower_id = ?",
      [id]
    );
    const posts = [...rows, ...results];
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/api/post/likes", async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const [rows] = await db.query<Like[]>(
      "SELECT * FROM `like` WHERE user_id = ? AND post_id = ?",
      [user_id, post_id]
    );
    if (rows.length === 1) {
      const [results] = await db.query(
        "DELETE FROM `like` WHERE user_id = ? AND post_id = ?",
        [user_id, post_id]
      );
      res.status(200).json("いいねを外しました");
    } else {
      const [results] = await db.query(
        "INSERT INTO `like` (user_id, post_id) VALUES (?, ?)",
        [user_id, post_id]
      );
      res.status(200).json("いいねを押しました");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/api/post/likes/:postId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    const [rows] = await db.query<LikeCount[]>(
      "SELECT COUNT(*) sum from `like` WHERE post_id = ?",
      [postId]
    );
    const countRow = rows[0];

    let isLiked = false;
    const [results] = await db.query<Like[]>(
      "SELECT * FROM `like` WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );
    isLiked = results.length > 0;
    res.status(200).json({sum: countRow.sum, isLiked})
  } catch (err) {
    res.status(500).json(err);
  }
});

export default route;
