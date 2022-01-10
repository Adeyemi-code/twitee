import { Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import config from "../config/config";
import { IGetUserAuthInfoRequest } from "../contracts/IGetUserAuthInfoRequest";
import db from "../instances";
interface JWTPayLoad {
  id: string;
}
const Auth = {
  async verifyToken(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) {
    const token: string | undefined = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).send({ message: "Token is not provided" });
    }
    try {
      const decoded = <JWTPayLoad>await jwt.verify(token, config.SECRET);
      const text = "SELECT * FROM users WHERE id = $1";
      const { rows } = await db.query(text, [decoded.id]);
      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: "The token you provided is invalid" });
      }
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      const expired = error as TokenExpiredError;
      console.log(expired);
      if (expired) return res.status(400).send({ message: expired.message });

      return res
        .status(400)
        .send({ message: "Invalid auth token provided", error });
    }
  },
};

export default Auth;
