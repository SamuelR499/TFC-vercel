import { NextFunction, Request, Response } from 'express';
import HttpException from './HTTPexception';

const httpErrorMiddlewere = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  console.log('internal Error --->', err.message);

  res.status(status || 500).json({ message });
};

export default httpErrorMiddlewere;
