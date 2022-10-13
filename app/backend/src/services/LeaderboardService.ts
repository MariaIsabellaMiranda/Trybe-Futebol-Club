import { IRatings, ITeams, StatusCodes } from '../entities/entities';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

export default class LeaderboardService {
  constructor(private teamsModel: typeof Team) { }
  calculateTotalPoints = (teams: any) => {
    let wins = 0;
    let loss = 0;
    let draw = 0;
    let totalPoints = 0;

    teams.homeM.forEach((matches: any) => {
      if (matches.homeTeamGoals > matches.awayTeamGoals) {
        wins += 1;
        totalPoints += 3;
      } else if (matches.homeTeamGoals < matches.awayTeamGoals) {
        loss += 1;
        totalPoints += 0;
      } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
        draw += 1;
        totalPoints += 1;
      }
    });

    return { wins, loss, draw, totalPoints };
  };

  calculateGoals = (teams: ITeams) => {
    let goalsFavor = 0;
    let goalsOwn = 0;

    teams.homeM?.forEach((matches) => {
      goalsFavor += matches.homeTeamGoals;
      goalsOwn += matches.awayTeamGoals;
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsBalance, goalsFavor, goalsOwn };
  };

  totalRating = (teams: any) => {
    const points = this.calculateTotalPoints(teams);
    const goals = this.calculateGoals(teams);
    const totalGames = teams.homeM.length;
    const efficiency = (points.totalPoints / (totalGames * 3)) * 100;

    return {
      name: teams.teamName,
      totalPoints: points.totalPoints,
      totalGames,
      totalVictories: points.wins,
      totalDraws: points.draw,
      totalLosses: points.loss,
      goalsFavor: goals.goalsFavor,
      goalsOwn: goals.goalsOwn,
      goalsBalance: goals.goalsBalance,
      efficiency: Number(efficiency.toFixed(2)),
    };
  };

  sortRating = (ratings: IRatings[]) => {
    const sortRating = ratings.sort((ratingsA: IRatings, ratingsB: IRatings) => {
      if (ratingsA.totalPoints < ratingsB.totalPoints) { return 1; }
      if (ratingsA.totalPoints > ratingsB.totalPoints) { return -1; }
      if (ratingsA.totalVictories < ratingsB.totalVictories) { return 1; }
      if (ratingsA.totalVictories > ratingsB.totalVictories) { return -1; }
      if (ratingsA.goalsBalance < ratingsB.goalsBalance) { return 1; }
      if (ratingsA.goalsBalance > ratingsB.goalsBalance) { return -1; }
      if (ratingsA.goalsFavor < ratingsB.goalsFavor) { return 1; }
      if (ratingsA.goalsFavor > ratingsB.goalsFavor) { return -1; }
      if (ratingsA.goalsOwn < ratingsB.goalsOwn) { return 1; }
      if (ratingsA.goalsOwn > ratingsB.goalsOwn) { return -1; }
      return 0;
    });
    return sortRating;
  };

  async getHomeTeams() {
    const data = await this.teamsModel.findAll({
      include: [{
        model: Matche, as: 'homeM', where: { inProgress: false }, attributes: { exclude: ['id'] },
      }],

    });

    const ratings: IRatings[] = data.map((teams) => this.totalRating(teams));
    const sortRating = this.sortRating(ratings);

    return { code: StatusCodes.ok, data: sortRating };
  }
}
