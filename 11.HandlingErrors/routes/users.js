const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const errorsHandler = require("../utils/errorsHandler");
// require("express-async-errors");

router.get("/", async (req, res) => {
  throw new Error("this is test err");
});

module.exports = router;