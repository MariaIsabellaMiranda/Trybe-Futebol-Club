import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LearderboardController';
import Team from '../database/models/Team';

const router = Router();

const leaderService = new LeaderboardService(Team);
const leaderController = new LeaderboardController(leaderService);

router.get('/home', (req, res) => leaderController.getHomeTeams(req, res));

export default router;
