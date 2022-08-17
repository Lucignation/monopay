import { Router } from 'express';
import userRouter from './users.route';
import transactionRouter from './transactions.route';

const routes = Router();

routes.use(userRouter);
routes.use(transactionRouter);

export default routes;
