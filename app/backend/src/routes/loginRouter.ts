import { Router } from 'express';
import User from '../database/models/User';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/loginController';
import validToken from '../middlewares/auth';

const router = Router();

const loginService = new LoginService(User);
const loginController = new LoginController(loginService);

router.post('/', (req, res) => loginController.loginValidate(req, res));
router.get('/validate', validToken, (req, res) => loginController.tokenValidate(req, res));

export default router;
