import { ICommentTwit, ILikeTwit, ITwit } from "./../contracts/ITwit";
import { IGetUserAuthInfoRequest } from "./../contracts/IGetUserAuthInfoRequest";
import { Response } from "express";
import { matchedData, validationResult } from "express-validator";
import TwitService from "../services/TwitService";
import LikeRepository from "../repositories/LikeRepository";
import CommentRepository from "../repositories/CommentRepository";

const twitService = new TwitService();
const likeRepo = new LikeRepository();
const commentRepo = new CommentRepository();
const TwitController = {
  async createTwit(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as ITwit;
    payload.owner_id = req?.user?.id;

    const response = await twitService.createTwit(payload);
    return res.status(200).send(response.data);
  },
  async getTwit(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as ITwit;
    payload.owner_id = req?.user?.id;

    const response = await twitService.getTwitById(payload);
    return res.status(200).send(response.data);
  },
  async getTwits(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as ITwit;
    payload.owner_id = req?.user?.id;

    const response = await twitService.getTwits(payload);
    return res.status(200).send(response.data);
  },
  async likeTwit(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const { twitID } = req.params;

    const payload = matchedData(req) as ILikeTwit;
    payload.twit_id = twitID;
    payload.user_id = req!.user!.id;
    await likeRepo.LikeTwit(payload);
    return res.status(200).send({ message: "success" });
  },
  async unLikeTwit(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const { twitID } = req.params;

    const payload = matchedData(req) as ILikeTwit;
    payload.user_id = req!.user!.id;
    payload.twit_id = twitID;

    await likeRepo.UnLikeTwits(payload);
    return res.status(200).send({ message: "success" });
  },
  async commentOnTwit(req: IGetUserAuthInfoRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const { twitID } = req.params;
    const payload = matchedData(req) as ICommentTwit;
    payload.user_id = req!.user!.id;
    payload.twit_id = twitID;
    await commentRepo.createComment(payload);
    return res.status(200).send({ message: "success" });
  },
};

export default TwitController;
