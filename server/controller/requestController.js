const Request = require("../model/request");
const User = require("../model/user");
const File = require("../model/file");
const cron = require("node-cron");

exports.newRequest = async (req, res) => {
  try {
    const { user, file } = req.body;

    var userName = await User.findById(user);
    var fileName = await File.findById(file);
    var createRequest = await Request.create({
      user: user,
      file: file,
      user_name: userName.name,
      file_name: fileName.title,
    });
    if (createRequest) {
      createRequest.save();
      res.json({ success: "Request Added Successfully" });
    }
  } catch {
    res.json({ msd: "request creation fail" });
  }
};

exports.requestList = async (req, res) => {
  var allRequest = await Request.find({});
  res.send(allRequest);
};

exports.acceptRequest = async (req, res) => {
  const { id } = req.params;
  var requestData = await Request.findById(id);
  var fileData = await File.findById(requestData.file);
  fileData.allow_user.push(requestData.user);
  await File.findByIdAndUpdate(fileData._id, {
    $set: { allow_user: fileData.allow_user },
  });
  await Request.findByIdAndUpdate(id, {
    $set: { is_approved: true, is_pending: false },
  });

  res.send({ msg: success });
};

exports.rejectRequest = async (req, res) => {
  const { id } = req.params;
  const rejected = await Request.findByIdAndUpdate(id, {
    $set: { is_rejected: true, is_pending: false },
  });
  if (rejected) {
    res.send({ msg: "success" });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  const request = await Request.findByIdAndDelete(id);
  res.send(request);
};

exports.reportRequest = async (req, res) => {
  try {
    const comment = req.body;
    const { id } = req.params;
    const file = await Request.findOneAndUpdate(
      { file: id },
      {
        comments: comment,
      },
      { new: true, overwrite: true },
    );
    res.send(file);
  } catch (error) {
    res.send(error);
  }
};

cron.schedule("30 2 * * *", () => {
  updatedAt = Request.find({});
  
});
