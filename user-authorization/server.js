require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const db = require("./models/");
const router = require("./controller/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, POST, PUT, OPTIONS");
  next();
});
app.use("/", router);

db.sync();

app.listen(process.env.PORT || 3000, () => {
  console.log(`User-Authorization running on port ${process.env.PORT || 3000}`);
});
