import { QueryResult } from "pg";
import { IUser } from "../contracts/IUser";
import db from "../instances";
import moment from "moment";
import { IResponse } from "../contracts/IResponse";
class UserRepository {
  async create(data: IUser): Promise<IResponse> {
    try {
      const queryText = `INSERT INTO users(id, name, email, password, 
      created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        data.id,
        data.name,
        data.email,
        data.password,
        moment(new Date()),
        moment(new Date()),
      ];
      await db.query(queryText, values);
      const res: IResponse = {
        data,
      };
      return res;
    } catch (error: any) {
      console.error("error", error);
      return { message: error.detail };
    }
  }
  async get(data: IUser): Promise<IResponse> {
    try {
      const queryText = `SELECT id, name, email, password FROM users WHERE email=$1`;
      const values = [data.email];
      const result: QueryResult = await db.query(queryText, values);
      const res: IResponse = {
        data: result.rows[0],
      };

      return res;
    } catch (error: any) {
      console.error("error", error);

      return { message: error.detail };
    }
  }
}
export default UserRepository;
