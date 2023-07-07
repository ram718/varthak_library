const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  if (decoded) {
    req.body.userID = decoded.userID;
    req.body.time = new Date();
    next();
  } else {
    res.status(401).send({ msg: "User not found" });
  }
};

module.exports = { userAuth };
