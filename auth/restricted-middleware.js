const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decToken) => {
      if (err) {
        //the token is bad
        res.status(401).json({ message: "Invalid credentials." });
      } else {
        //all good
        req.decJWT = decToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};
