export interface IUserCreated {
  ID: number;
  User: IUser;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserGet {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}
