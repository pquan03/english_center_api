import express from 'express';
import dashboardControlelr from '../controllers/dashboard.controller';
const router = express.Router();


router.route('/')
    .get(dashboardControlelr.getDashboard)

router.get('/money-chart', dashboardControlelr.getMoneyChartByRange)

export default router;