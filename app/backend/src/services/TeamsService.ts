import TeamsModel from '../database/models/TeamsModel';

export default class TeamService {
  public getTeams = async () => {
    const teams = await TeamsModel.findAll();
    return teams;
  };

  public findById = async (id: string) => {
    const team = await TeamsModel.findOne({ where: { id } });
    return team;
  };

  public teamsExist = async (awayTeam: string, homeTeam: string) => {
    const teamHome = await TeamsModel.findOne({ where: { id: homeTeam } });
    const teamAway = await TeamsModel.findOne({ where: { id: awayTeam } });

    const result = !(!teamHome || !teamAway);
    return result;
  };
}
