const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: Buffer,
  },
  has_256: {
    type: String,
  },
  file_mimetype: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  allow_user: {
    type: Array,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
