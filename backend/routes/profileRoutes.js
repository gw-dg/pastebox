const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Paste = require("../models/paste");
const { optionalJWTAuth } = require("../middlewares/passportStrategies");
const router = express.Router();

router.get("/profile/:username", optionalJWTAuth, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isItYourOwnId =
      req.user && req.user._id.toString() === user._id.toString();

    let allPastes = [];
    if (isItYourOwnId) {
      allPastes = await Paste.find({
        user: user._id,
      });
    } else {
      allPastes = await Paste.find({
        user: user._id,
        isPrivate: false,
      });
    }

    res.json({
      user: {
        username: user.username,
        email: user.email,
        // other profile details
      },
      pastes: allPastes, // Include both public and private pastes
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
