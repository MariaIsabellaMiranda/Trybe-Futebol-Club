import { Router } from 'express';
import User from '../database/models/User';
import LoginModel from '../models/loginModel';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController(new LoginService(new LoginModel(User)));

router.post('/', loginController.loginValidate);

export default router;
