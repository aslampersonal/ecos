const app = require("express");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const secretKey = process.env.SECRET_KEY;

const checkUserToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }

};

module.exports = checkUserToken;