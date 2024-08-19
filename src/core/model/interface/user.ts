export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}

export interface IUserDetails {
  User?: IUser;
  //Programs: IPrograms[]
}
