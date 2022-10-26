import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchService = new MatchesService();

export default class TeamsController {
  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await matchService.getMatchesByProgress(inProgress as string);
      return res.status(200).json(matches);
    }

    const matches = await matchService.getMatches();
    return res.status(200).json(matches);
  };
}
