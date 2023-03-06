import { IMatch, ITeam, ITeamResult } from '../interfaces';

type teamType = 'homeTeam' | 'awayTeam';

class LeaderboardManager {
  public getTeamTable = (
    matches: IMatch[],
    teams: ITeam[],
    whereIsTeam: teamType,
  ) => {
    const teamTable: ITeamResult[] = teams.map((team) => ({
      name: team.teamName,
      totalPoints: this.getPoints(matches, team.id, whereIsTeam),
      totalGames: this.getTotalGames(matches, team.id, whereIsTeam).length,
      totalVictories: this.getVictories(matches, team.id, whereIsTeam).length,
      totalDraws: this.getDraws(matches, team.id, whereIsTeam).length,
      totalLosses: this.getLosses(matches, team.id, whereIsTeam).length,
      goalsFavor: this.goalsFavor(matches, team.id, whereIsTeam),
      goalsOwn: this.goalsOwn(matches, team.id, whereIsTeam),
      goalsBalance: this.goalsBalance(matches, team.id, whereIsTeam),
      efficiency: this.getEfficiency(matches, team.id, whereIsTeam),
    })).sort(this.deepSort);

    return teamTable;
  };

  public getTotalGames = (
    matches: IMatch[],
    id: number | undefined,
    whereIsTeam: teamType,
  ) => matches
    .filter((match) => Number(match[whereIsTeam]) === id);

  // -------------------------------------------------
  public getGoalsFavor = (totalGames: IMatch[], whereIsTeam: teamType) => {
    const goals: (
      'homeTeamGoals' | 'awayTeamGoals') = whereIsTeam === 'homeTeam'
      ? 'homeTeamGoals' : 'awayTeamGoals';

    const result = totalGames.reduce((total, match) => total + match[goals], 0);

    return result;
  };

  public goalsFavor = (allMatches: IMatch[], id: number | undefined, whereIsTeam: teamType) => {
    const totalGames = this.getTotalGames(allMatches, id, whereIsTeam);
    return this.getGoalsFavor(totalGames, whereIsTeam);
  };

  // -------------------------------------------------

  public getgoalsOwn = (totalGames: IMatch[], whereIsTeam: teamType) => {
    const goals: (
      'homeTeamGoals' | 'awayTeamGoals') = whereIsTeam === 'homeTeam'
      ? 'awayTeamGoals' : 'homeTeamGoals';

    const result = totalGames.reduce((total, match) => total + match[goals], 0);

    return result;
  };

  public goalsOwn = (allMatches: IMatch[], id: number | undefined, whereIsTeam: teamType) => {
    const totalGames = this.getTotalGames(allMatches, id, whereIsTeam);
    return this.getgoalsOwn(totalGames, whereIsTeam);
  };

  // ---------------------------------------------------------
  public getVictories = (
    matches: IMatch[],
    id: number | undefined,
    whereIsTeam: teamType,
  ) => matches
    .filter((match) => match[whereIsTeam] === id && match.homeTeamGoals > match.awayTeamGoals);

  // ---------------------------------------------------------

  public getLosses = (
    matches: IMatch[],
    id: number | undefined,
    whereIsTeam: teamType,
  ) => matches
    .filter((match) => match[whereIsTeam] === id && match.homeTeamGoals < match.awayTeamGoals);

  // ---------------------------------------------------------

  public getDraws = (
    matches: IMatch[],
    id: number | undefined,
    whereIsTeam: teamType,
  ) => matches
    .filter((match) => match[whereIsTeam] === id && match.homeTeamGoals === match.awayTeamGoals);

  // ---------------------------------------------------------

  public goalsBalance = (allMatches: IMatch[], id: number | undefined, whereIsTeam: teamType) => {
    const totalGames = this.getTotalGames(allMatches, id, whereIsTeam);
    const goalsFavor = this.getGoalsFavor(totalGames, whereIsTeam);
    const goalsOwn = this.getgoalsOwn(totalGames, whereIsTeam);

    const balance = goalsFavor - goalsOwn;

    return balance;
  };

  // ---------------------------------------------------------

  public getPoints = (allMatches: IMatch[], id: number | undefined, whereIsTeam: teamType) => {
    const totalGames = this.getTotalGames(allMatches, id, whereIsTeam);
    const totalVictories = this.getVictories(totalGames, id, whereIsTeam).length;
    const totalDraws = this.getDraws(totalGames, id, whereIsTeam).length;

    const points = (3 * totalVictories) + totalDraws;

    return points;
  };

  // ---------------------------------------------------------

  public getEfficiency = (allMatches: IMatch[], id: number | undefined, whereIsTeam: teamType) => {
    const totalGames = this.getTotalGames(allMatches, id, whereIsTeam);
    const totalPoints = this.getPoints(totalGames, id, whereIsTeam);

    const efficiency = totalPoints / (totalGames.length * 3);
    const res = Number((efficiency * 100).toFixed(2));
    return res;
  };

  // ---------------------------------------------------------

  public deepSort = (a: ITeamResult, b: ITeamResult) => {
    let sort = b.totalPoints - a.totalPoints;
    if (!sort) sort = b.totalVictories - a.totalVictories;
    if (!sort) sort = b.goalsBalance - a.goalsBalance;
    if (!sort) sort = b.goalsFavor - a.goalsFavor;
    if (!sort) sort = a.goalsOwn - b.goalsOwn;
    return sort;
  };

  // ---------------------------------------------------------

  public getLeaderBoard = (home: ITeamResult[], away: ITeamResult[]) => {
    const arrLeaders: ITeamResult[] = home.map((homeTeam) => {
      const awayAndHome = away.find((awayTeam) => awayTeam.name === homeTeam.name);
      return { name: homeTeam.name,
        totalPoints: homeTeam.totalPoints + (awayAndHome?.totalPoints ?? 0),
        totalGames: homeTeam.totalGames + (awayAndHome?.totalGames ?? 0),
        totalVictories: homeTeam.totalVictories + (awayAndHome?.totalVictories ?? 0),
        totalDraws: homeTeam.totalDraws + (awayAndHome?.totalDraws ?? 0),
        totalLosses: homeTeam.totalLosses + (awayAndHome?.totalLosses ?? 0),
        goalsFavor: homeTeam.goalsFavor + (awayAndHome?.goalsFavor ?? 0),
        goalsOwn: homeTeam.goalsOwn + (awayAndHome?.goalsOwn ?? 0),
        goalsBalance: homeTeam.goalsBalance + (awayAndHome?.goalsBalance ?? 0),
        efficiency: LeaderboardManager.getEfi(
          homeTeam.totalPoints + (awayAndHome?.totalPoints ?? 0),
          homeTeam.totalGames + (awayAndHome?.totalGames ?? 0),
        ),
      };
    });
    return arrLeaders.sort(this.deepSort);
  }

  static getEfi(pontosTotais: number, jogosTotais: number): number {
    const resultado = Number(((pontosTotais / (jogosTotais * 3)) * 100).toFixed(2));
    return resultado;
  }

}

export default new LeaderboardManager();
