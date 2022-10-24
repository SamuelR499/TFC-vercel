import { Request, Response, NextFunction } from 'express';
import schemas from '../validations/schemas';
import HttpException from './HTTPexception';

const loginMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemas.loginSchema.validate(req.body);

  if (error) {
    console.log(error);
    throw new HttpException(400, error.details[0].message);
  }
  next();
};

export default loginMiddleware;
