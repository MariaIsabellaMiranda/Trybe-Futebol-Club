import { Router } from 'express';
import validToken from '../middlewares/auth';
import Matche from '../database/models/Matche';
import MatcheService from '../services/MatcheService';
import MatcheController from '../controllers/MatcheController';

const router = Router();

const matcheService = new MatcheService(Matche);
const matcheController = new MatcheController(matcheService);

router.get('/', (req, res) => matcheController.getMatchesAll(req, res));
router.post('/', validToken, (req, res) => matcheController.saveMtaches(req, res));

export default router;
