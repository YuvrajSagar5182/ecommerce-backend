const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusteryuvi.duf0crf.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    console.log('Can\'t connect');
    process.exit(1);
  }
};

module.exports = connectDB;
