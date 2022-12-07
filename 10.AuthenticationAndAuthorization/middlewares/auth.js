const jwt = require("jsonwebtoken");

exports.checkToken = function checkToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (!decoded) 
    return res.status(401).json({msg: "Invalid token"});
  req.user = decoded;
  next();
}