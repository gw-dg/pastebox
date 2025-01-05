const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pastes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paste",
    },
  ],
  backgroundImage: {
    type: String,
    default: "https://artshortlist.com/files/48502313109648854.jpg",
  },
  profileImage: {
    type: String,
    default:
      "https://img.notionusercontent.com/s3/prod-files-secure%2F792b936b-8e44-40f0-8063-0d88168c1500%2F0658be98-25b3-4081-9d81-fbe13edd1777%2Figor1.jpeg/size/w=250?exp=1736092400&sig=zmfWaZ6RbRJEzxJw9X7fJ-pBa-zQoZHxBD4NjiEv87U",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
