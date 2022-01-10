import { ICommentTwit } from "./../contracts/ITwit";
import db from "../instances";
import moment from "moment";
class CommentRepository {
  async createComment(data: ICommentTwit) {
    try {
      const queryText = `INSERT INTO comments(twit_id, user_id, comment, created_date, modified_date)
                          VALUES($1, $2, $3, $4, $5)`;
      const values = [
        data.twit_id,
        data.user_id,
        data.comment,
        moment(new Date()),
        moment(new Date()),
      ];
      await db.query(queryText, values);
    } catch (error: any) {
      console.error("error", error);
      return { message: error.detail };
    }
  }
}
export default CommentRepository;
