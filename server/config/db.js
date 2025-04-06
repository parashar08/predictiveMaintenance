const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://the69bit:6zRbTehOvVQINdiL@predictivemaintenancecl.trb6bil.mongodb.net/systemInfo'
    );
    console.log('Database connected successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
