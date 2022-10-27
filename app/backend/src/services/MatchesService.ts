import { Imatch } from '../interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IScoreboard } from '../interfaces/IScoreboard';

export default class TeamService {
  public getMatches = async () => {
    const matches = await MatchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  };

  public getMatchesByProgress = async (query: string) => {
    const inProgress = JSON.parse(query);

    const matches = await MatchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
      where: { inProgress },
    });

    return matches;
  };

  public createMatch = async (match: Imatch) => {
    const inProgress = true;
    const result = await MatchesModel.create({ ...match, inProgress });

    return result;
  };

  public uptdateMatch = async (id: string) => {
    await MatchesModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  };

  public uptdateScoreboard = async (id: string, scoreboard: IScoreboard) => {
    const { awayTeamGoals, homeTeamGoals } = scoreboard;

    await MatchesModel.update({ awayTeamGoals, homeTeamGoals }, {
      where: {
        id,
      },
    });
  };
}
