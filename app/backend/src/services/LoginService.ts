import bcrypt = require('bcryptjs');
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import TokenManager from '../utils/TokenManager';
import HttpException from '../middlewares/HTTPexception';

export default class LoginService {
  public makeLogin = async ({ email, password }: ILogin) => {
    const [user] = await UserModel.findAll({ where: { email } });

    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = TokenManager.makeToken(user);
    return { token, user };
  };

  public getRole = async (login: ILogin) => {
    const { user } = await this.makeLogin(login);
    return user;
  };
}
