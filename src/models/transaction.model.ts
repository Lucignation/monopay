import mongoose, { Schema } from 'mongoose';

//import interface
import { ITransaction } from '../common/interfaces/transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    title: {
      type: String,
      required: [true, 'Please enter the title of the transaction'],
    },
    transactionType: {
      type: String,
      required: [true, 'Please enter the type of transaction'],
    },
    amount: { type: Number, required: [true, 'Please enter the amount'] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user object'],
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction>(
  'Transactions',
  transactionSchema
);
