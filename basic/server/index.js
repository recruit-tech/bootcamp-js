const express = require("express");
const bodyParser = require("body-parser");
const todoRouter = require("./todo");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/todo", todoRouter);

app.listen(PORT);
