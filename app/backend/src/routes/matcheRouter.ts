import { Router } from 'express';
import validToken from '../middlewares/auth';
import Matche from '../database/models/Matche';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';

const router = Router();

const matcheService = new MatcheService(Matche);
const matcheController = new MatcheController(matcheService);

router.get('/', (req, res) => matcheController.getMatchesAll(req, res));
router.post('/', validToken, (req, res) => matcheController.saveMtaches(req, res));
router.patch('/:id/finish', (req, res) => matcheController.updateByInProgress(req, res));
router.patch('/:id', (req, res) => matcheController.updateMatcheProgress(req, res));

export default router;
