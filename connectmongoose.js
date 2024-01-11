const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
    console.log("MongoDB connection success");
  } catch (error) {
    console.log("MongoDB connection failed" + error.message);
  }
};

module.exports = connectDB;
