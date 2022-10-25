import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchService = new MatchesService();

export default class TeamsController {
  public getMatches = async (_req: Request, res: Response) => {
    const matches = await matchService.getMatches();

    return res.status(200).json(matches);
  };

  public getMatchesInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await matchService.getMatchesInProgress(inProgress as string);

    return res.status(200).json(matches);
  };
}
