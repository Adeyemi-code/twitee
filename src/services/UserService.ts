import { IResponse } from "./../contracts/IResponse";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "./../contracts/IUser";
import Helper from "../Helpers/Helper";
import { v4 as uuidv4 } from "uuid";
import EmailService from "./EmailService";

const userRepo = new UserRepository();
const emailService = new EmailService();

class UserService {
  async createUser(user: IUser): Promise<IResponse> {
    user.password = Helper.hashPassword(user.password);

    const result: IResponse = await userRepo.create(user);
    const data = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: "Welcome to Twittee!",
      template: "welcome",
      name: user.name,
    };

    await emailService.sendEmail(data, function (err: any, data: any) {
      if (err) {
        console.log("Error occurred ", err);
      } else {
        console.log("Email sent!!! ", data);
      }
    });
    return result;
  }
  async loginUser(data: IUser): Promise<IResponse> {
    const result = data.email.match(/\w+/);
    const user: IUser = {
      id: uuidv4(),
      name: result![0],
      email: data.email,
      password: data.password,
    };
    await this.createUser(user);

    const res: IResponse = await userRepo.get(data);
    if (!res.data) {
      return { message: `User with email ${data.email} not registered` };
    }
    const match = Helper.comparePassword(data.password, res.data.password);
    if (!match) {
      return { message: "Invalid login credentials" };
    }
    if (res?.data?.id) {
      const token = Helper.generateToken(res.data.id);
      res.token = token;
    }
    return res;
  }
}
export default UserService;
