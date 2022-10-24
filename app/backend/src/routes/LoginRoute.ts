import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddlewares from '../middlewares/loginMiddleware';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginMiddlewares, (req, res) => loginController.makelogin(req, res));

export default loginRouter;
