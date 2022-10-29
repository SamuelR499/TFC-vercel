import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { IData } from '../interfaces';

const loginService = new LoginService();

export default class LoginController {
  public makelogin = async (req: Request, res: Response) => {
    const { token } = await loginService.makeLogin(req.body);
    return res.status(200).json({ token });
  };

  public getRole = async (req: IData, res: Response) => {
    const role = req.data?.role;

    return res.status(200).json({ role });
  };
}
