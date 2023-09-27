const jwt = require("jsonwebtoken");
const secretKey = process.env.ADMIN_KEY;


const checkAdminToken = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }

};

module.exports = checkAdminToken;