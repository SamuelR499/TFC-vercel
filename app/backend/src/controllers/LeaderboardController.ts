import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import MatchesService from '../services/MatchesService';
import leaderboardManager from '../utils/LeaderboardManager';

const teamsService = new TeamsService();
const matchesService = new MatchesService();

export default class LeaderboardController {
  public getHomeTeamData = async (_req: Request, res: Response) => {
    const matches = await matchesService.getMatchesByProgress('false');
    const teams = await teamsService.getTeams();
    const result = leaderboardManager.getTeamTable(matches, teams, 'homeTeam');
    return res.status(200).json(result);
  };

  public getAwayTeamData = async (_req: Request, res: Response) => {
    const matches = await matchesService.getMatchesByProgress('false');
    const teams = await teamsService.getTeams();
    const result = leaderboardManager.getTeamTable(matches, teams, 'awayTeam');
    return res.status(200).json(result);
  };
}
