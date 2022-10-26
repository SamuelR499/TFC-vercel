import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', (req, res) => matchesController.getMatches(req, res));
MatchesRouter.post('/', (req, res) => matchesController.createMatch(req, res));
MatchesRouter.patch('/:id/finish', (req, res) => matchesController.uptdateMatch(req, res));

export default MatchesRouter;
