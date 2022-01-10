import { IResponse, ITwitResponse } from "./../contracts/IResponse";
import TwitRepository from "../repositories/TwitRepository";
import { ITwit } from "../contracts/ITwit";

const twitRepo = new TwitRepository();

class TwitService {
  async createTwit(twit: ITwit): Promise<ITwitResponse> {
    const result: ITwitResponse = await twitRepo.createTwit(twit);
    return result;
  }
  async getTwitById(twit: ITwit): Promise<ITwitResponse> {
    const result: ITwitResponse = await twitRepo.getTwit(twit);
    return result;
  }
  async getTwits(twit: ITwit): Promise<ITwitResponse> {
    const result: ITwitResponse = await twitRepo.getTwits(twit);
    return result;
  }
  async deleteTwit(twit: ITwit): Promise<void> {
    await twitRepo.deleteTwit(twit);
  }
}
export default TwitService;
