export interface IUser {
  username: string;
  isAuthenticated: boolean;
  email: string;
  token: string;
  roles: string[];
}
