const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendEmail } = require("../utils/sendEmail");

// ✅ USER SIGNUP
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ Signup failed: User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        console.log("✅ New user registered:", newUser.email);

        res.status(201).json({
            message: "User registered successfully",
            user: { username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error("🔥 Signup error:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
};

// ✅ USER LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "1m" }
        );

        console.log("✅ Login successful for:", user.email);

        res.status(200).json({
            message: "Login successful",
            token,
            user: { username: user.username, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error("🔥 Login error:", error);
        res.status(500).json({ error: "Server error during login" });
    }
};

// ✅ FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const message = `
      <h3>Password Reset Request</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 15 minutes.</p>
    `;

        // ✅ SECURITY OVERRIDE FOR DEV:
        const recipient =
            process.env.NODE_ENV === "production"
                ? user.email // in live mode, send to real user
                : process.env.DEV_EMAIL; // in dev mode, send only to your own inbox

        await sendEmail(recipient, "Password Reset Link", message);

        res.status(200).json({ message: `Reset link sent to ${recipient}` });
    } catch (error) {
        console.error("🔥 Forgot Password Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ VERIFY RESET TOKEN
exports.verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;
        console.log("🔍 Verifying reset token:", token);

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            console.log("❌ Invalid or expired token");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        res.status(200).json({ message: "Valid token" });
    } catch (error) {
        console.error("🔥 Token verification error:", error);
        res.status(500).json({ error: "Server error verifying token" });
    }
};

// ✅ RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        //console.log("🔑 Reset password for token:", token);

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password required" });
        }

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            console.log("❌ Invalid or expired token");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        console.log("✅ Password successfully reset for:", user.email);
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("🔥 Reset password error:", error);
        res.status(500).json({ error: "Server error during password reset" });
    }
};

// ✅ GET ALL USERS (ADMIN)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password -resetToken -resetTokenExpiry");
        res.status(200).json(users);
    } catch (error) {
        console.error("🔥 Error fetching users:", error);
        res.status(500).json({ error: "Server error fetching users" });
    }
};

// ✅ GET SINGLE USER BY EMAIL
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }, "-password -resetToken -resetTokenExpiry");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("🔥 Error fetching user:", error);
        res.status(500).json({ error: "Server error fetching user" });
    }
};
