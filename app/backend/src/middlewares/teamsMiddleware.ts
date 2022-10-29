import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import HttpException from './HTTPexception';
import TeamService from '../services/TeamsService';

const secret = process.env.JWT_SECRET || ('jwt_secret' as jwt.Secret);

const teamsService = new TeamService();

const teamsMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  const { awayTeam, homeTeam } = req.body;
  const teamsExist = await teamsService.teamsExist(awayTeam, homeTeam);

  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  if (!teamsExist) {
    throw new HttpException(404, 'There is no team with such id!');
  }
  if (homeTeam === awayTeam) {
    throw new HttpException(422, 'It is not possible to create a match with two equal teams');
  }

  try {
    jwt.verify(token, secret);
  } catch (error) {
    throw new HttpException(401, 'Token must be a valid token');
  }
  next();
};

export default teamsMiddleware;
