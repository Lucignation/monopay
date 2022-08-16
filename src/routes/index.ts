import { Router } from 'express';
import userRouter from './users.route';

const routes = Router();

routes.use(userRouter);

export default routes;
