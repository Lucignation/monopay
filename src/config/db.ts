import mongoose from 'mongoose';

const connectDB = async () => {
  const LOCAL_DB = process.env.MONGODB_URIL;
  //   const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_URI =
    'mongodb+srv://gerald:gerald12345@cluster0.lki96.mongodb.net/monopay';

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
