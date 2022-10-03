import { IUser } from '../entities/entities';
import User from '../database/models/User';

export default class LoginModel {
  constructor(private usersModel: typeof User) { }

  async getUserEmail(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne({ where: { email } });

    return user as IUser | null;
  }
}
