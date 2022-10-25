import { Request, Response } from 'express';
import TokenManager from '../utils/TokenManager';
import LoginService from '../services/LoginService';
import { IUser } from '../interfaces/Iuser';

const loginService = new LoginService();

export default class LoginController {
  public makelogin = async (req: Request, res: Response) => {
    const { token } = await loginService.makeLogin(req.body);
    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const user = (await TokenManager.authenticateToken(authorization)) as IUser;
    const { role } = user.data;
    return res.status(200).json({ role });
  };
}
