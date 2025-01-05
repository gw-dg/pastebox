const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const passport = require("passport");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Respond with the JWT token
    return res.status(201).json({
      token,
      message: "New user created and logged in successfully!",
    });
  } catch (err) {
    res.status(500).json({ "Internal Server Error": err });
  }
});

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: info?.message || "Login failed" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ token, message: "Login successful" });
  })(req, res);
});

router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      // If we get here, the token is valid (passport middleware validated it)
      // and req.user contains the decoded user data
      return res.json({
        valid: true,
        user: {
          username: req.user.username,
          email: req.user.email,
          _id: req.user._id,
        },
      });
    } catch (error) {
      return res.status(401).json({
        valid: false,
        error: "Invalid token",
      });
    }
  }
);

module.exports = router;
