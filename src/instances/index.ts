import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 5430,
  password: process.env.PASS,
});

export default {
  query(text: string, params?: Array<any>): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
