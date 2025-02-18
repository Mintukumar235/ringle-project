const express = require("express");
const { sendOTP, verifyOTP, registerUser } = require("../controller/authController");

const router = express.Router();

// ✅ Define Routes
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);

module.exports = router;
