import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'real-sns',
  waitForConnections: true,
  connectionLimit: 10,
});
