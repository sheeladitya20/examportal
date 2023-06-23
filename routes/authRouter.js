const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretKey";

// JWT TOKEN
app.get("/", (req, resp) => {
  resp.json({
    message: "a sample api",
  });
});

app.post("/login", authController.login);
app.post("/profile", verifyToken, (req, resp) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      resp.send({ result: "Sorry Profile cant be accessed" });
    } else {
      resp.json({
        message: "profile is accessed and below is your information",
        authData,
      });
    }
  });
});

function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  console.log("bearerHeader >>", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.send({
      result: "Token is not valid",
    });
  }
}
// Register a new user
router.post("/register", authController.register);

// Authenticate user and generate JWT token
router.post("/login", authController.login);

module.exports = router;
