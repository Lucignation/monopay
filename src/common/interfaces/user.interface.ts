export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string;
  plan?: string;
  phoneNumber?: number;
  createdOn: Date;
  lastLogin: Date;
}

export interface IUserAuth {
  username: string;
  email: string;
  password: string;
}
