const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const authRoute = require("./routes/auth");

// Setup DB
mongoose.connect("mongodb://localhost/authenticationandauthorization")
  .then(() => console.log(""))

// Express setup
const app = express();

app.use("/auth", authRoute);

app.listen(3000, function() { console.log("App Running")});