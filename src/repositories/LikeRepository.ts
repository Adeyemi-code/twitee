import { ILikeTwit } from "./../contracts/ITwit";
import db from "../instances";
class LikeRepository {
  async LikeTwit(data: ILikeTwit) {
    try {
      const queryText = `INSERT INTO likes(twit_id, user_id) VALUES($1, $2)`;
      await db.query(queryText, [data.twit_id, data.user_id]);
    } catch (error: any) {
      console.error("error", error);
      return { message: error.detail };
    }
  }
  async UnLikeTwits(data: ILikeTwit) {
    try {
      const queryText = `DELETE FROM likes WHERE twit_id = $1 AND user_id = $2`;
      await db.query(queryText, [data.twit_id, data.user_id]);
    } catch (error: any) {
      console.error("error", error);

      return { message: error.detail };
    }
  }
}
export default LikeRepository;
