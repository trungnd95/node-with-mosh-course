// If using express-async-errors package, 
// do not need errorHandler wrapper function
require("express-async-errors");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/users");
const winston = require("winston");
require("winston-mongodb");

// Express setup
const app = express();

winston.add(new winston.transports.File({filename: "1.log"}));
winston.add(new winston.transports.MongoDB({db: "mongodb://localhost/handling_errors"}));
winston.handleExceptions(new winston.transports.File({filename: "uncaughtException.log"}));

// process.on("uncaughtException", (err) => {
//   //winston.error(new Error("Uncaught Exception"));
//   throw new Error("Uncaught Exception");
// })

process.on("unhandledRejection", (err) => {
  throw new Error(err);
})

app.use("/users", userRoute);

app.use((err, req, res, next) => {
  winston.error(err.message, err);
  res.status(err.status || 500).json(err.message || "Something went wrong");
})

app.listen(3000, function() { 
  // Connect DB
  mongoose.connect("mongodb://localhost/handling_errors")
  .then(() => console.log(""))

  console.log("App Running")
});