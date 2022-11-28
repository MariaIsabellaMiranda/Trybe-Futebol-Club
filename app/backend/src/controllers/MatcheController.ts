import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  constructor(private matchesService: MatcheService) { }

  async getMatchesAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) {
      const { code, data } = await this.matchesService.getMatchesInProgress(inProgress === 'true');

      return res.status(code).json(data);
    }

    const { code, data } = await this.matchesService.getMatchesAll();

    return res.status(code).json(data);
  }

  async saveMatches(req: Request, res: Response): Promise<Response> {
    const { code, data, message } = await this.matchesService.saveMatches(req.body);

    if (!data) return res.status(code).json({ message });

    return res.status(code).json(data);
  }

  async updateByInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { code, data } = await this.matchesService.updateByInProgress(Number(id));

    return res.status(code).json(data);
  }

  async updateMatcheProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { code, data } = await this.matchesService
      .updateMatcheProgress(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(code).json(data);
  }
}
