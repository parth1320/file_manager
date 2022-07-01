const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Request = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    user_name: {
      type: String,
      default: null,
    },
    file_name: {
      type: String,
      default: null,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_pending: {
      type: Boolean,
      default: true,
    },
    is_rejected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("request", Request);
