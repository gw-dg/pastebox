const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Paste = require("../models/paste");
const { optionalJWTAuth } = require("../middlewares/passportStrategies");

const router = express.Router();

router.get(
  "/paste/:id",
  passport.authenticate("jwt", { session: false, optional: true }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const paste = await Paste.findOne({ _id: id });
      if (!paste) return res.status(404).json({ message: "paste not found" });
      const isPastePublic = paste.isPrivate;
      const isItMyOwnPaste = req.user && req.user._id === paste.user;
      if (!isPastePublic || isItMyOwnPaste) {
        res.status(201).json(paste);
      } else res.status(404).json({ error: "Unauthorized" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/paste", optionalJWTAuth, async (req, res) => {
  try {
    const { content, expiration, isPrivate } = req.body;

    const paste = new Paste({
      content,
      expiration,
      isPrivate,
      user: req.user ? req.user._id : null,
    });

    const savedPaste = await paste.save();
    res.status(201).json(savedPaste);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the paste." });
  }
});

module.exports = router;
