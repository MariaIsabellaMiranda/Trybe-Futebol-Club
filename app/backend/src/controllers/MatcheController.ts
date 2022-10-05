import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  constructor(private matchesService: MatcheService) { }

  async getMatchesAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const { code, data } = await this.matchesService.getMatchesInProgressTrue();

      return res.status(code).json(data);
    }

    if (inProgress === 'false') {
      const { code, data } = await this.matchesService.getMatchesInProgressFalse();

      return res.status(code).json(data);
    }

    const { code, data } = await this.matchesService.getMatchesAll();

    return res.status(code).json(data);
  }

  async saveMtaches(req: Request, res: Response): Promise<Response> {
    const { code, data } = await this.matchesService.saveMatches(req.body);

    return res.status(code).json(data);
  }
}
