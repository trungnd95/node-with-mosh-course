const express = require("express");
const router = express.Router();
const User = require("../models/User");
const hash = require("../helpers/hash");
const bcrypt = require("bcrypt");

router.get("/register", async (req, res) => {
  //0. Validate user input
  const {error} = User.validateUser(req.body);
  if (error) 
    return res.status(400).json({ error: error.details[0].message});

  try {
    //1. Check user existence
    const user = await User.findOne({email: req.body.email});
    if (user) {
      //2. If exist -> return 400 bad request, user existed
      return res.status(400).json({ error: "User already exists" });
    }
    //3. If haven't been created -> create User and return 201 created status
    const {email, password} = req.body;
    const newUser = new User({email, password});
    await newUser.save();
    return res.status(201).json({msg: "Created user", user: {
      id: newUser._id,
      email: newUser.email,
      password: hash.doHashPass(newUser.password)
    }});
  } catch(err) {
    return res.status(500).json({msg: "Internal Server Error", error: err.message});
  }  
});


router.post("/login", async (req, res) => {
  //0. Validate user input
  const {error} = User.validateUser(req.body);
  if (error) 
    return res.status(400).json({ error: error.details[0].message});

  try {
    //1. Find user that match with email 
    const user = await User.findOne({ email: req.body.email});
    
    // 2. If not exists -> return 400 bad request
    if (!user)
      return res.status(400).json({ msg: 'Email or password is not match!' });

    // 3. If existed, compare password 
    if (await bcrypt.compare(user.password, req.body.password))
      // 4. If compare success -> return 200 OK 
      return res.status(200).json({msg: "logged in"});
      // 5. If compare failed -> return 400 bad request
    else 
      return res.status(400).json({ msg: "Bad Request" });

  } catch(err) {
      return res.status(500).json({ msg: "Internal Server Error!", error: err.message});
  }
});

module.exports = router;