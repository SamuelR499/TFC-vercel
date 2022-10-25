import { Request, Response, NextFunction } from 'express';
import HttpException from './HTTPexception';
import TokenManager from '../utils/TokenManager';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const user = await TokenManager.authenticateToken(authorization);
    console.log('User authmiddle', user);

    if (!user) {
      throw new HttpException(401, 'Expired or invalid token');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
