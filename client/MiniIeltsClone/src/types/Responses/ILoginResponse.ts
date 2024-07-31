import { IUser } from "../Model/User";

export interface ILoginResponse extends IUser {
  message: string;
}
