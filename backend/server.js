const express = require("express");
const Paste = require("./models/paste");
const db = require("./config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pasteRoutes = require("./routes/pasteRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();
console.log(process.env.FRONTEND_URL);

// app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
app.use(cors()); // Remove any existing cors configuration

// Enable pre-flight requests for all routes
app.options("*", cors());

// Add headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const passportStrategies = require("./middlewares/passportStrategies");
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - Auth header:`,
    req.headers.authorization
  );
  next();
});
app.use(express.json());
app.use(passport.initialize());
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", pasteRoutes);

app.post("/pastes", async (req, res) => {
  try {
    const data = req.body;
    const newPaste = new Paste(data);
    const response = await newPaste.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000);
