import { IResponseError } from './response-error.interface';

export interface IResponseMessage {
  error?: IResponseError;
  message?: string;
}
