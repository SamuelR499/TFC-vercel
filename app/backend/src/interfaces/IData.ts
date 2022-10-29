import { Request } from 'express';

export default interface IData extends Request {
  data?: {
    id: number;
    username: string;
    role: number;
    email: string;
    password: string;
  };
}
