const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: [String],
      default: "VIEWER",
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
