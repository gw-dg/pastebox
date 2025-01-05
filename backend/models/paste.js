const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const pasteSchema = new mongoose.Schema({
  content: contentSchema,
  expiration: {
    type: Date,
    default: null,
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

pasteSchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

const Paste = mongoose.model("Paste", pasteSchema);
module.exports = Paste;
