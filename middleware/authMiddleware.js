const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to request object
    next(); 
  } catch (error) {
    console.error("JWT Authentication Error:", error.message); // Log error for debugging
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
