const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const authRoute = require("./routes/auth");
const authMiddleware = require("./middlewares/auth");

// Setup DB
mongoose.connect("mongodb://localhost/authenticationandauthorization")
  .then(() => console.log(""))

// Express setup
const app = express();

app.get("/me", authMiddleware.checkToken, (req, res) => {
  res.send("hello me");
})
app.use("/auth", authRoute);

app.listen(3000, function() { console.log("App Running")});