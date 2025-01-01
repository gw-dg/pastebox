const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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
