import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import LoginController from '../controllers/LoginController';
import loginMiddlewares from '../middlewares/loginMiddleware';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginMiddlewares, (req, res) => loginController.makelogin(req, res));

loginRouter.get(
  '/validate',
  authMiddleware,
  (req, res) => loginController.getRole(req, res),
);
export default loginRouter;
