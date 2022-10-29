import { Response, NextFunction } from 'express';
import HttpException from './HTTPexception';
import TokenManager from '../utils/TokenManager';
import { IData } from '../interfaces';

const authMiddleware = async (req: IData, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const user = await TokenManager.authenticateToken(authorization);
    console.log('User authmiddle ---->', user);

    if (!user) {
      throw new HttpException(401, 'Expired or invalid token');
    }
    req.data = user.data;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
