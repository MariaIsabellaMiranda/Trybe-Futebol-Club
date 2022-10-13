import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private learderService: LeaderboardService) { }

  async getHomeTeams(req: Request, res: Response): Promise<Response> {
    const { code, data } = await this.learderService.getHomeTeams();

    return res.status(code).json(data);
  }
}
