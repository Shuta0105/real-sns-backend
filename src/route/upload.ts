import express from "express";
import multer from "multer";

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
route.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("画像アップロードに成功しました");
  } catch (err) {
    console.log(err);
  }
});

export default route;
