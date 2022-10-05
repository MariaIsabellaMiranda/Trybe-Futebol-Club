import { Router } from 'express';
import Team from '../database/models/Team';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);

router.get('/', (req, res) => teamController.getTeamsAll(req, res));
router.get('/:id', (req, res) => teamController.getTeamId(req, res));

export default router;
