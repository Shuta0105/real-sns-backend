import express from "express";
import cors from "cors";
import userRoutes from "./route/user";
import postRoutes from "./route/post";
import followRoutes from "./route/follow";
import uploadRoutes from "./route/upload";
import path from "path";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(userRoutes);
app.use(postRoutes);
app.use(followRoutes);
app.use(uploadRoutes);

app.listen(PORT, () => console.log("server is running"));
