const mongoose = require("mongoose");
const mongoUrl =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";

//setup connection
mongoose.connect(mongoUrl);

const db = mongoose.connection;

//temp event listeners
db.on("connected", () =>
  console.log("DB connection established successfully.")
);
db.on("disconnected", () => console.log("DB connection closed."));
db.on("error", (error) => console.error("DB connection error:", error));

module.exports = db;
