const bcrypt = require("bcrypt");

exports.doHashPass = function(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}