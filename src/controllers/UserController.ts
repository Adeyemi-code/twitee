import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { IUser } from "../contracts/IUser";
import UserService from "../services/UserService";

const userService = new UserService();

class UserController {

  async login(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as IUser;

    const response = await userService.loginUser(payload);
    if (response.message)
      return res.status(400).send({ message: response.message });

    return res.status(200).send({ token: response.token });
  }
}

export default UserController;
