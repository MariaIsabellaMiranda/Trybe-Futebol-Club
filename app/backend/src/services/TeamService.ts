import { StatusCodes } from '../entities/entities';
import Team from '../database/models/Team';

export default class TeamService {
  constructor(private teamsModel: typeof Team) { }

  async getTeamsAll() {
    const teams = await this.teamsModel.findAll();

    return { code: StatusCodes.ok, data: teams };
  }

  async getTeamId(id: number) {
    const team = await this.teamsModel.findByPk(id);

    return { code: StatusCodes.ok, data: team };
  }
}
