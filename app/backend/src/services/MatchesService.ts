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
}
