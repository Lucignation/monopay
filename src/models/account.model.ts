import mongoose, { Schema } from 'mongoose';

//import interface
import { IBankAccount } from '../common/interfaces/transaction.interface';

const accountSchema = new Schema<IBankAccount>(
  {
    accountName: {
      type: String,
      required: [true, 'Please enter your account name '],
    },
    accountNumber: {
      type: Number,
      required: [true, 'Please enter your account number'],
    },
    bankName: { type: String, required: [true, 'Please enter your bank name'] },
    balance: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user object'],
    },
  },
  { timestamps: true }
);

export const Account = mongoose.model<IBankAccount>('Account', accountSchema);
