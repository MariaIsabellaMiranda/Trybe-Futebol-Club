import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamsService: TeamService) { }

  async getTeamsAll(_req: Request, res: Response): Promise<Response> {
    const { code, data } = await this.teamsService.getTeamsAll();

    return res.status(code).json(data);
  }

  async getTeamId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { code, data } = await this.teamsService.getTeamId(Number(id));

    return res.status(code).json(data);
  }
}
