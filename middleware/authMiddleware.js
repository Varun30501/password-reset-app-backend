// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ Middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Expect token in header: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(404).json({ message: "User not found" });

      next(); // Continue to the next middleware or route
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// ✅ Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = { protect, adminOnly };
