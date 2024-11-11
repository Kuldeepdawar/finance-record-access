// MongoDB connection configuration
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      dbName: "finance",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    setTimeout(connectDB, 5000);
    process.exit(1);
  }
};

module.exports = connectDB;
