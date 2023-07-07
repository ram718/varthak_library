const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const { userAuth } = require("./middleware/userAuth.middleware");
const { bookRouter } = require("./route/books.route");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

app.use(express.json());

const accessLogStream = fs.createWriteStream(path.join("", "access.log"), {
  flags: "a",
});

app.use(
  morgan(
    " :method :status :res[content-length] :response-time ms :date[web] :http-version :url\n",
    { stream: accessLogStream }
  )
);

app.use("/user", userRouter);
app.use(userAuth);
app.use("", bookRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to mongodb`);
  } catch (err) {
    console.log(err);
  }
});
