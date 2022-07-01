const express = require("express");
const { verifyAccessToken } = require("../middleware/auth");

const {
  newRequest,
  requestList,
  acceptRequest,
  rejectRequest,
} = require("../controller/requestController");
const Router = express.Router();

Router.post("/request", verifyAccessToken, newRequest);
Router.get("/request/All", verifyAccessToken, requestList);
Router.get("/request/approved/:id", verifyAccessToken, acceptRequest);
Router.get("/request/rejected/:id", verifyAccessToken, rejectRequest);

module.exports = Router;
