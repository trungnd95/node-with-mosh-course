const bcrypt = require("bcrypt");

exports.doHashPass = async function(pass) {
  return await bcrypt.hash(pass, bcrypt.genSalt(10));
}