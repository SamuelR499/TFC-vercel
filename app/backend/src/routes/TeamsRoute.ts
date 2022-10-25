import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = Router();

const teamsController = new TeamsController();

TeamsRouter.get('/:id', (req, res) => teamsController.findById(req, res));
TeamsRouter.get('/', (req, res) => teamsController.getTeams(req, res));
export default TeamsRouter;
