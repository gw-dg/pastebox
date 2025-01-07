// const mongoose = require("mongoose");
// require("dotenv").config();
// // const mongoUrl =
// //   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";
// const mongoUrl = `${process.env.MONGOURL}`;

// //setup connection
// mongoose.connect(mongoUrl);

// const db = mongoose.connection;

// //temp event listeners
// db.on("connected", () =>
//   console.log("DB connection established successfully.")
// );
// db.on("disconnected", () => console.log("DB connection closed."));
// db.on("error", (error) => console.error("DB connection error:", error));

// module.exports = db;
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGOURL;

const db = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if we can't connect to database
  }
};

module.exports = db;
