import { IMatches, StatusCodes } from '../entities/entities';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

export default class MatcheService {
  constructor(private matchesModel: typeof Matche) { }

  async getMatchesAll() {
    const data = await this.matchesModel.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: Team, as: 'teamAway', attributes: { exclude: ['id'] },
      }],
    });

    return { code: StatusCodes.ok, data };
  }

  async getMatchesInProgress(progress: boolean) {
    const data = await this.matchesModel.findAll(
      { where: { inProgress: progress },
        include: [{
          model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
        },
        {
          model: Team, as: 'teamAway', attributes: { exclude: ['id'] },
        }],
      },
    );

    return { code: StatusCodes.ok, data };
  }

  async saveMatches(matches: IMatches) {
    if (matches.homeTeam === matches.awayTeam) {
      return {
        code: StatusCodes.tokenNot,
        message: 'It is not possible to create a match with two equal teams' };
    }

    try {
      const data = await this.matchesModel.create(matches);

      return { code: StatusCodes.created, data };
    } catch (error) {
      return { code: StatusCodes.notExist, message: 'There is no team with such id!' };
    }
  }

  async updateByInProgress(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });

    return { code: StatusCodes.ok, data: { message: 'Finished' } };
  }

  async updateMatcheProgress(id: number, homeId: number, awayId: number) {
    await this.matchesModel.update(
      {
        homeTeamGoals: homeId,
        awayTeamGoals: awayId,
      },
      { where: { id } },
    );

    return { code: StatusCodes.ok, data: { message: 'Updated' } };
  }
}
