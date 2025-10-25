const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    forgotPassword,
    verifyResetToken,
    resetPassword,
    getAllUsers,
    getUserByEmail,
} = require("../controllers/authController");

// 🧩 User Registration
router.post("/signup", registerUser);

// 🔐 User Login
router.post("/login", loginUser);

// 🔑 Forgot Password (send reset email)
router.post("/forgot-password", forgotPassword);

// 🧾 Verify reset token validity
router.get("/reset-password/:token", verifyResetToken);

// 🔄 Reset password using token
router.post("/reset-password", resetPassword);

// 👥 Get all users (for admin or debugging)
router.get("/users", getAllUsers);

// 🔎 Get single user by email
router.get("/users/:email", getUserByEmail);

module.exports = router;
