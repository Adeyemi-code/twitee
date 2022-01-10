import { ITwit } from "./ITwit";
import { IUser } from "./IUser";

export interface IResponse {
  message?: string;
  data?: IUser;
  error?: any;
  token?: string;
}
export interface ITwitResponse {
  message?: string;
  data?: ITwit | ITwit[];
  error?: any;
}
