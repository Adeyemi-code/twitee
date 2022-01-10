import { ITwit } from "./../contracts/ITwit";
import { QueryResult } from "pg";
import { IUser } from "../contracts/IUser";
import db from "../instances";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { IResponse, ITwitResponse } from "../contracts/IResponse";
class TwitRepository {
  async createTwit(data: ITwit): Promise<ITwitResponse> {
    try {
      const queryText = `INSERT INTO twits(id, twit, owner_id,
      created_date, modified_date) VALUES($1, $2, $3, $4, $5)
      `;
      const values = [
        uuidv4(),
        data.twit,
        data.owner_id,
        moment(new Date()),
        moment(new Date()),
      ];
      await db.query(queryText, values);
      const response: ITwitResponse = {
        data,
      };
      return response;
    } catch (error: any) {
      console.error("error", error);
      return { message: error.detail };
    }
  }
  async getTwits(data: ITwit): Promise<ITwitResponse> {
    try {
      const queryText = `SELECT * FROM twits WHERE owner_id = $1`;

      const result: QueryResult = await db.query(queryText, [data.owner_id]);
      const res: ITwitResponse = {
        data: result.rows,
      };

      return res;
    } catch (error: any) {
      console.error("error", error);

      return { message: error.detail };
    }
  }
  async getTwit(data: ITwit): Promise<ITwitResponse> {
    try {
      const queryText = `SELECT * FROM twits WHERE owner_id = $1 AND id = $2`;

      const result: QueryResult = await db.query(queryText, [
        data.owner_id,
        data.id,
      ]);
      const res: ITwitResponse = {
        data: result.rows[0],
      };

      return res;
    } catch (error: any) {
      console.error("error", error);

      return { message: error.detail };
    }
  }
  async deleteTwit(data: ITwit) {
    try {
      const queryText = `DELETE FROM twits WHERE owner_id = $1 AND id = $2`;

       await db.query(queryText, [
        data.owner_id,
        data.id,
      ]);
    
    } catch (error: any) {
      console.error("error", error);

      return { message: error.detail };
    }
  }
}
export default TwitRepository;
