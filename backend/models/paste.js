const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const pasteSchema = new mongoose.Schema({
  content: contentSchema,
  expiration: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paste = mongoose.model("Paste", pasteSchema);
module.exports = Paste;
