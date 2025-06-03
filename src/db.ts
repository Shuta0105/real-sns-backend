import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


export const db = mysql.createPool({
  host: process.env.MYSQL_PUBLIC_URL,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});
