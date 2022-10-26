import { Imatch } from '../interfaces/IMatch';
import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

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
    const result = await MatchesModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });

    return result;
  };
}
