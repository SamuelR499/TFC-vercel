import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeTeamData(req, res));
LeaderboardRouter.get('/away', (req, res) => leaderboardController.getAwayTeamData(req, res));
export default LeaderboardRouter;
