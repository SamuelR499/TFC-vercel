import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const teamsService = new TeamsService();

export default class TeamsController {
  public getTeams = async (_req: Request, res: Response) => {
    const teams = await teamsService.getTeams();

    return res.status(200).json(teams);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamsService.findById(id);

    return res.status(200).json(team);
  };
}
