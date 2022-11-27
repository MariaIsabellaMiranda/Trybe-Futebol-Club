import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LearderboardController';
import Team from '../database/models/Team';
import Matche from '../database/models/Matche';

const router = Router();

const leaderService = new LeaderboardService(Team, Matche);
const leaderController = new LeaderboardController(leaderService);

router.get('/home', (req, res) => leaderController.getHomeTeams(req, res));
router.get('/away', (req, res) => leaderController.getAwayTeams(req, res));
router.get('/', (req, res) => leaderController.getAllTeams(req, res));

export default router;
