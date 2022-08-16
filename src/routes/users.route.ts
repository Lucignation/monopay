import { Router, Response, Request } from 'express';
import auth from '../middleware/auth';
const userRouter = Router();

import { postCreateUser, postLoginUser } from '../controllers/users.controller';

/**
 * @swagger
 *
 * /api/user/signup:
 *   post:
 *     description: post request to create account for new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *       404:
 *         description: user not found
 *       400:
 *         description: Invalid login details!
 */
userRouter.post('/api/user/signup', postCreateUser);

/**
 * @swagger
 *
 * /api/user/signin:
 *   post:
 *     description: post request to login an existing user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *       404:
 *         description: user not found
 *       400:
 *         description: Invalid login details!
 */
userRouter.post('/api/user/signin', postLoginUser);

export default userRouter;
