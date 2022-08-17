import { Router, Response, Request } from 'express';
import auth from '../middleware/auth';
const transactionRouter = Router();

import {
  postLinkAccount,
  getAllUserLinkedAccounts,
  postUnlinkAccount,
  postTransaction,
  getAllUserTransactions,
} from '../controllers/transactions.controller';

/**
 * @swagger
 *
 * /api/user/link-account:
 *   post:
 *     description: post request to create /update bank  account detail
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: accountName
 *         description: Name of the account of the user
 *         required: true
 *         type: string
 *        - name: accountNumber
 *         description: User's account number
 *         required: true
 *         type: number
 *       - name: bankName,
 *         description: Bank name of the user's bank
 *         required: true
 *         type: string
 *        - name: Account,
 *         description: User's balance for a particular bank
 *         required: true
 *         type: number
 *          default: is zero for new account been linked without balance
 *     responses:
 *       200:
 *         description: Account updated
 *       201:
 *        description: Account created
 *       404:
 *         description: user not found
 *       400:
 *         description: Invalid login details!
 */
transactionRouter.post('/api/user/link-account', auth, postLinkAccount);

/**
 * @swagger
 *
 * /api/user/linked-accounts:
 *   get:
 *     description: post request to get a user's linked accounts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user's Id.
 *         in: body
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
transactionRouter.get(
  '/api/user/linked-accounts',
  auth,
  getAllUserLinkedAccounts
);

/**
 * @swagger
 *
 * /api/user/unlinked-account:
 *   get:
 *     description: post request to get a user's unlinked account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: account number
 *         description: user's particular account number
 *         in: body
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: unlink
 *       404:
 *         description: user not found
 *       400:
 *         description: Invalid login details!
 */
transactionRouter.post('/api/user/unlinked-account', auth, postUnlinkAccount);

/**
 * @swagger
 *
 * /api/user/transaction:
 *   post:
 *     description: post request to transaction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: title of the transaction
 *         in: body
 *         required: true
 *         type: string
 *       - name: transaction type
 *         description: the type will either be debit or credit
 *         in: body
 *         required: true
 *         type: string
 *       - name: amount
 *         description:  amount of
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
transactionRouter.post('/api/user/transaction', auth, postTransaction);

/**
 * @swagger
 *
 * /api/user/transactions:
 *   get:
 *     description: post request to get a user's transactions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user's Id.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: transaction
 *       401:
 *         description: not authorized
 *       400:
 *         description: try again!
 */
transactionRouter.get('/api/user/transactions', auth, getAllUserTransactions);

export default transactionRouter;
