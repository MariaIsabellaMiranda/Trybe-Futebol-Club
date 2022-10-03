import * as bcrypt from 'bcryptjs';
import { StatusCodes, ILogin } from '../entities/entities';
import { createToken } from '../helper/tokenHelper';
import LoginModel from '../models/loginModel';

export default class LoginService {
  constructor(private loginModel: LoginModel) { }

  async verifyLogin(login: ILogin) {
    if (!login.email || !login.password) {
      return { code: StatusCodes.fieldsNot, message: 'All fields must be filled' };
    }

    const user = await this.loginModel.getUserEmail(login.email);

    if (!user) return { code: StatusCodes.tokenNot, message: 'Incorrect email or password' };

    const verifyPassword = await bcrypt.compare(login.password, user.password);

    if (!verifyPassword) {
      return { code: StatusCodes.tokenNot, message: 'Incorrect email or password' };
    }

    const token = createToken(login.email);

    return { code: StatusCodes.ok, data: token };
  }
}
