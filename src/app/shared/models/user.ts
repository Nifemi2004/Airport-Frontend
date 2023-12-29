export interface User {
  role?: string;
  _id?: string;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}
