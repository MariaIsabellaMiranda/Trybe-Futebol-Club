import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) { }

  async loginValidate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { code, data, message } = await this.loginService.verifyLogin({ email, password });

    if (!data) return res.status(code).json({ message });

    return res.status(code).json(data);
  }

  async tokenValidate(req: Request, res: Response): Promise<Response> {
    const { user } = req.body;

    const { code, data } = await this.loginService.getRoleUser(user);

    return res.status(code).json({ role: data });
  }
}
