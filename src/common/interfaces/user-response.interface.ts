import { CreateUserDto } from '../Dtos/user.dto';
import { IResponseError } from './response-error.interface';

export interface IUserResponse {
  error?: IResponseError;
  user?: CreateUserDto;
}
