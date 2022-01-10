import { IUser } from "./IUser";

export interface QueryResult {
  command: string;
  rowCount: number;
  oid?: any;
  rows: IUserRow[];
}

export interface IUserRow extends IUser {}
