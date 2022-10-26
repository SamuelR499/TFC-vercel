import { Request, Response, NextFunction } from 'express';
import HttpException from './HTTPexception';

const teamsMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { awayTeam, homeTeam } = req.body;

  if (awayTeam === homeTeam) {
    throw new HttpException(422, 'It is not possible to create a match with two equal teams');
  }
  next();
};

export default teamsMiddleware;
