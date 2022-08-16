import { IUser } from '../interfaces/user.interface';

export interface CreateUserDto extends IUser {
  token?: string;
}

export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  createdOn: Date;
  lastLogin: Date;
}
