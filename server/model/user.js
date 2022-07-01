const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const options = {
    expiresIn: "14d",
  };
  const token = await jwt.sign(
    { _id: user._id.toString() },
    keys.secretOrKey,
    options,
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

module.exports = mongoose.model("User", UserSchema);
