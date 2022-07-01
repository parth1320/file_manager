const jwt = require("jsonwebtoken");
const User = require("../model/user");
const keys = require("../config/keys");

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      const options = {
        expiresIn: "14d",
      };
      jwt.sign(payload, keys.secretOrKey, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    console.log(req.headers["authorization"]);
    if (!req.headers["authorization"])
      return res.json({ message: "Access Denied" });
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if (token === "null") {
      res.json({ message: "Access Denied" });
    }

    jwt.verify(token, keys.secretOrKey, (err, payload) => {
      if (err) return res.json({ message: err });
      next();
    });
  },
};
