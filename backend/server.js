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

const allowedOrigins = ["https://the-last-note-f2x7.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if origin is in allowedOrigins
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

// Add OPTIONS handling for preflight requests
app.options("*", (req, res) => {
  res.status(204).send();
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
