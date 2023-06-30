const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretKey";
// Middleware function to validate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
