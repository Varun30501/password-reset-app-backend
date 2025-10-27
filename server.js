const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors("https://https://astounding-cendol-50ede6.netlify.app"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("🚀 Password Reset API is running!");
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));

