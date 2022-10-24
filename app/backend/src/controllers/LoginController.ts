import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

const loginService = new LoginService();

export default class LoginController {
  public makelogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await loginService.makeLogin({ email, password });

    return res.status(200).json({ token });
  };
}
