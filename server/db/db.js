const mongoose = require("mongoose");
const File = require("../model/file");
const mdg = require("mongo-date-query");

mongoose
  .connect("mongodb://127.0.0.1:27017/file_upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully connected"))
  .catch((err) => console.log(err));
