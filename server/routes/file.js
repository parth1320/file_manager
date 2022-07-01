const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("../model/file");
const { verifyAccessToken } = require("../middleware/auth");
const Router = express.Router();
const upload = multer({
  // storage: multer.diskStorage({
  //   destination(req, file, cb) {
  //     cb(null, "./files");
  //   },
  //   filename(req, file, cb) {
  //     cb(null, `${new Date().getTime()}_${file.originalname}`);
  //   },
  // }),
  limits: {
    fileSize: 10000000, //max file size is 10 Mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "Only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.",
        ),
      );
    }
    cb(undefined, true); //continue with upload
  },
});

Router.post(
  "/upload/:id",
  upload.single("file"),
  verifyAccessToken,
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { mimetype } = req.file;
      const avatar = req.file.buffer;
      const { id } = req.params;
      console.log(id);
      const file = new File({
        title,
        description,
        avatar,
        file_mimetype: mimetype,
        user: id,
      });
      await file.save();
      res.send("file uploaded successfully");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later. ");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  },
);

Router.get("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({}).lean();
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.get("/download/:id", verifyAccessToken, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-type": file.file_mimetype,
    });
    res.send(file.avatar);
  } catch (error) {
    res.status(400).send("Error while downloading file. Try agian later");
  }
});

module.exports = Router;
