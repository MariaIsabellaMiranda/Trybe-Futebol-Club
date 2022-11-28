import { IRatings, StatusCodes } from '../entities/entities';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';
import leaderboardHomeHelper from '../helper/leaderboardHomeHelper';
import leaderboardAwayHelper from '../helper/leaderboardAwayHelper';
import sortRatingHelper from '../helper/sortRatingHelper';
import leaderBoardAllHelper from '../helper/leaderBoardAllHelper';

export default class LeaderboardService {
  constructor(private teamsModel: typeof Team, private matchesModel: typeof Matche) { }
  async getHomeTeams() {
    const data = await this.teamsModel.findAll({
      include: [{
        model: Matche, as: 'homeM', where: { inProgress: false }, attributes: { exclude: ['id'] },
      }],
    });

    const ratings: IRatings[] = data.map((teams) => leaderboardHomeHelper.totalRatingHome(teams));
    const sortRating = sortRatingHelper.sortRating(ratings);

    return { code: StatusCodes.ok, data: sortRating };
  }

  async getAwayTeams() {
    const data = await this.teamsModel.findAll({
      include: [{
        model: Matche, as: 'awayM', where: { inProgress: false }, attributes: { exclude: ['id'] },
      }],
    });

    const ratings: IRatings[] = data.map((teams) => leaderboardAwayHelper.totalRatingAway(teams));
    const sortRating = sortRatingHelper.sortRating(ratings);

    return { code: StatusCodes.ok, data: sortRating };
  }

  async getAllTeams() {
    const { data: homeMatches } = await this.getHomeTeams();
    const { data: awayMatches } = await this.getAwayTeams();

    sortRatingHelper.sortTeams(homeMatches);
    sortRatingHelper.sortTeams(awayMatches);

    const summedScores = leaderBoardAllHelper.sumScores(homeMatches, awayMatches);
    const sortRating = sortRatingHelper.sortRating(summedScores);

    return { code: StatusCodes.ok, data: sortRating };
  }
}
