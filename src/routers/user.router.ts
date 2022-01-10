import { Router } from "express";
import UserController from "../controllers/UserController";
import { userRules } from "../rules/user.rules";

export const userRouter = Router();
const userController = new UserController();
// Routes
/**
 * @swagger
 * /api/v1/login:
 *  post:
 *    description: User login route
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.post("/login", userRules["forLogin"], userController.login);
