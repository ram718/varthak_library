const express = require("express");
const userRouter = express.Router();
const { UserSchema, UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register Api
userRouter.post("/register", async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: err });
      } else {
        const payload = { email, password: hash, name, role };
        const data = new UserModel(payload);
        await data.save();
        res.status(201).send({ msg: "Account is created" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

//Login Api
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        res.status(400).send({ msg: err });
      } else {
        if (result) {
          res.status(201).send({
            msg: "Login success",
            token: jwt.sign({ userID: user._id }, process.env.key),
          });
        } else {
          res.status(400).send({ msg: "Wrong credentials" });
        }
      }
    });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

module.exports = { userRouter };
