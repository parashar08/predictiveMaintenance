const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
