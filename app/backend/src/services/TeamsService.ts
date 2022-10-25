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
}
