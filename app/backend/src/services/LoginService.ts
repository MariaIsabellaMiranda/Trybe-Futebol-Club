import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { ILogin, StatusCodes } from '../entities/entities';
import { createToken } from '../helper/tokenHelper';

const incorrectEmailOrPassword = 'Incorrect email or password';

export default class LoginService {
  constructor(private usersModel: typeof User) { }

  async verifyLogin(login: ILogin) {
    if (!login.email || !login.password) {
      return { code: StatusCodes.fieldsNot, message: 'All fields must be filled' };
    }

    const { email, password } = login;

    const user = await this.usersModel.findOne({ where: { email } });

    if (!user) return { code: StatusCodes.tokenNot, message: incorrectEmailOrPassword };

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return { code: StatusCodes.tokenNot, message: incorrectEmailOrPassword };
    }

    const token = createToken(email);

    return { code: StatusCodes.ok, data: token };
  }

  async getRoleUser(email: string) {
    const user = await this.usersModel.findOne({ where: { email } });

    if (!user) return { code: StatusCodes.tokenNot, message: incorrectEmailOrPassword };

    return { code: StatusCodes.ok, data: user.role };
  }
}
