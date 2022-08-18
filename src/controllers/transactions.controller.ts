import { Request, Response } from 'express';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';
import { IResponseMessage } from '../common/interfaces/response-message.interface';
import { Transaction } from '../models/transaction.model';
const cron = require('node-cron');

export const postLinkAccount = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user, accountName, accountNumber, bankName, amount } = req.body;

  if (!accountName || !accountNumber || !bankName) {
    res.status(400).json({ msg: 'All fields are required.' });

    return 'All fields are required.';
  }

  if (!user) {
    res.status(401).json({ msg: "can't perform this actions" });

    return "can't perform this actions";
  }

  const existingUser = await Account.findOne({ accountNumber: accountNumber });

  if (existingUser) {
    // const newAccount = await Account.findOneAndUpdate({
    //   userId: user,
    //   accountName,
    //   accountNumber,
    //   bankName,
    //   $inc: { balance: amount },
    //   new: true,
    // });

    existingUser.accountName = accountName;
    existingUser.accountNumber = accountNumber;
    existingUser.bankName = bankName;
    existingUser.balance = existingUser.balance + amount;

    await existingUser.save();
    res.status(200).json({ msg: existingUser });

    return 'Account updated.';
  }
  const newAccount = await new Account({
    userId: user.userId,
    accountName,
    accountNumber,
    bankName,
    balance: amount,
  });

  await newAccount.save();

  res.status(201).json({ msg: newAccount });

  return 'Account created.';
};

//Get a user's linked accounts
export const getAllUserLinkedAccounts = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user } = req.body;

  if (!user) {
    res.status(400).json({ msg: 'Please login to continue' });
    return 'Login to continue';
  }

  const allLinkedAccound = await Account.find({ userId: user.userId });
  res.status(200).json({ msg: allLinkedAccound });

  return 'well fetched';
};

//Unlink a user's account
export const postUnlinkAccount = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user, accountNumber } = req.body;

  if (!user) {
    res.status(400).json({ msg: 'Please login to continue' });
    return 'Login to continue';
  }

  const userAccount = await Account.findOne({ accountNumber: accountNumber });

  if (!userAccount) {
    res.status(404).json({ msg: 'Account not found' });
    return 'Account not found';
  }

  if (String(userAccount.userId) !== String(user.userId)) {
    res.status(401).json({ msg: 'Not authorized' });
    return 'Not authorized';
  }

  await Account.deleteOne({ accountNumber: accountNumber });
  res.status(200).json({ msg: 'Account Unlinked ' });
  return 'Account Unlinked';
};

//Post transaction
export const postTransaction = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user, title, transactionType, amount, accountNumber } = req.body;

  if (!user) {
    res.status(400).json({ msg: 'Please login to continue' });
    return 'Login to continue';
  }

  const accountDetail = await Account.findOne({ accountNumber: accountNumber });

  if (!accountDetail) {
    res
      .status(400)
      .json({ msg: 'Please link an account to continue this transaction' });
    return 'Please link an account to continue this transaction';
  }

  if (accountDetail.balance < amount) {
    res.status(400).json({ msg: 'Insufficient fund' });
    return 'Insufficient fund';
  }

  const newTransaction = await new Transaction({
    userId: user.userId,
    title,
    transactionType,
    amount,
  });

  accountDetail.balance = accountDetail.balance - amount;

  await accountDetail.save();
  await newTransaction.save();
  res.status(200).json({ msg: newTransaction });
  return 'transaction successful';
};

//Get a user's transactions
export const getAllUserTransactions = async (
  req: Request,
  res: Response
): Promise<string> => {
  const { user } = req.body;

  if (!user) {
    res.status(400).json({ msg: 'Please login to continue' });
    return 'Login to continue';
  }

  const allTransactions = await Transaction.find({ userId: user.userId });
  res.status(200).json({ msg: allTransactions });

  //fetch new transactions after every 3 hours
  cron.schedule('* * */3 * *', async () => {
    const allTransactions = await Transaction.find({ userId: user.userId });
    res.status(200).json({ msg: allTransactions });
  });
  return 'well fetched';
};
