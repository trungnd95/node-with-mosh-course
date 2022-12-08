const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    require: true,
    unique: true, 
    minlength: 3, 
    maxlength: 255
  }, 
  password: {
    type: String,
    require: true, 
    minlength: 6, 
    maxlength: 255
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string().min(3).max(255).email().required(), 
    password: new PasswordComplexity({
      min: 6,
      max: 255,
      lowerCase: 1, 
      upperCase: 1, 
      numeric: 1, 
      symbol: 1, 
      requirementCount: 2
    })
  }
  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validateUser
};