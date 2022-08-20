import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI);
    // await mongoose.connect(LOCAL_DB);
    console.log('MongoDB connect');
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectDB;
