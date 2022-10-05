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

  async getMatchesInProgressTrue() {
    const data = await this.matchesModel.findAll(
      { where: { inProgress: true },
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

  async getMatchesInProgressFalse() {
    const data = await this.matchesModel.findAll(
      { where: { inProgress: false },
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
    let matchesRefactor = matches;

    if (matchesRefactor.inProgress === 'true') {
      matchesRefactor = { ...matches, inProgress: 1 };
    }

    if (matchesRefactor.inProgress === 'false') {
      matchesRefactor = { ...matches, inProgress: 2 };
    }
    const data = await this.matchesModel.create(matchesRefactor);

    return { code: StatusCodes.created, data };
  }
}
