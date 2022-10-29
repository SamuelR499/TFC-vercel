import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpException from '../middlewares/HTTPexception';
import { IData } from '../interfaces';

const secret = process.env.JWT_SECRET || ('jwt_secret' as jwt.Secret);

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static authenticateToken = async (token: string | undefined) => {
    if (!token) {
      throw new HttpException(401, 'Token not found');
    }

    try {
      const validateToken = jwt.verify(token, secret);
      return validateToken as IData;
    } catch (error) {
      throw new HttpException(401, 'Expired or invalid token');
    }
  };
}
