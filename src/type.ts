import { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
  id: number;
  user_id: number;
  body: string;
  created_at: Date;
  image: string;
}

export interface Like extends RowDataPacket {
  user_id: number;
  post_id: number;
}

export interface LikeCount extends RowDataPacket {
  sum: number;
}
