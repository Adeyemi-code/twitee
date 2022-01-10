import { Router } from "express";
import TwitController from "../controllers/TwitController";
import Auth from "../middleware/Auth";
import { twitRules } from "../rules/twit.rules";

export const twitRouter = Router();
// Routes
/**
 * @swagger
 * /api/v1/twits:
 *  post:
 *    description: create twits
 *    responses:
 *      '200':
 *        description: A successful response
 */
twitRouter.post("/twits", twitRules["forTwits"], Auth.verifyToken, TwitController.createTwit);
twitRouter.get("/twits", Auth.verifyToken, TwitController.getTwits);
twitRouter.post("/twits/like/:twitID", Auth.verifyToken, TwitController.likeTwit);
twitRouter.delete( "/twits/unlike/:twitID", Auth.verifyToken, TwitController.unLikeTwit);
twitRouter.post("/twits/comment/:twitID", twitRules["forComment"], Auth.verifyToken, TwitController.commentOnTwit);
