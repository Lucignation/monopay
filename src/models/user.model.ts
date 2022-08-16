import mongoose, { Schema } from 'mongoose';

//import interface
import { IUser } from '../common/interfaces/user.interface';

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
