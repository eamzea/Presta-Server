const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    profilePic: {
      type: String
    },
    aboutMe: String,
    stuffs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stuff"
      }
    ],
    verificationCode: String,
    expireCodeDate: String,
    validatedEmail: {
      type: Boolean,
      default: false
    },
    since: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
