const express = require("express");
const bookRouter = express.Router();
const { BookModel } = require("../model/books.model");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
require("dotenv").config();

//Post Api to create book
bookRouter.post("/books", async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const user = await UserModel.findOne({ _id: decoded.userID });
  try {
    if (user.role.includes("CREATOR")) {
      const data = await new BookModel(payload);
      await data.save();
      res.status(200).send({ msg: "Book added" });
    } else {
      res.status(400).send({ msg: "User not authorized" });
    }
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

// Get Api
bookRouter.get("/books", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const user = await UserModel.findOne({ _id: decoded.userID });

  try {
    if (user.role.includes("VIEW_ALL")) {
      if (req.query.new === "1") {
        const afterTenMinutes = await BookModel.find({
          time: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
        });
        res.status(200).send(afterTenMinutes);
      } else if (req.query.old === "1") {
        const belowTenMinutes = await BookModel.find({
          time: { $lt: new Date(Date.now() - 10 * 60 * 1000) },
        });
        res.status(200).send(belowTenMinutes);
      } else {
        const allBooks = await BookModel.find();
        res.status(200).send(allBooks);
      }
    } else if (user.role.includes("VIEWER") || user.role.includes("CREATOR")) {
      const allBooks = await BookModel.find();
      const data = allBooks.filter((e) => e.userID === decoded.userID);
      if (req.query.new === "1") {
        const belowTenMinutes = data.filter(
          (e) => e.time > new Date(Date.now() - 10 * 60 * 1000)
        );
        res.status(200).send(belowTenMinutes);
      } else if (req.query.old === "1") {
        const afterTenMinutes = data.filter(
          (e) => e.time <= new Date(Date.now() - 10 * 60 * 1000)
        );
        res.status(200).send(afterTenMinutes);
      } else {
        res.status(200).send(data);
      }
    } else {
      res.status(400).send({ msg: "No data found" });
    }
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

module.exports = { bookRouter };
