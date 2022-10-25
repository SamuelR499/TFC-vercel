import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = Router();

const teamsController = new TeamsController();

TeamsRouter.get('/', (req, res) => teamsController.getTeams(req, res));

export default TeamsRouter;
