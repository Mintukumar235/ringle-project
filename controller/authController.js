const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Send OTP
exports.sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    console.error("❌ Error: Mobile number required");
    return res.status(400).json({ message: "Mobile number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); 

  try {
    console.log(`🚀 Sending OTP ${otp} to ${mobileNumber}...`);
    
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });

    // Generate a token containing OTP (unverified)
    const token = jwt.sign({ mobileNumber, otp, is_verified: false }, process.env.JWT_SECRET, { expiresIn: "5m" });

    res.status(200).json({ message: "OTP sent successfully", token });
  } catch (error) {
    console.error("❌ Twilio Error:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

// ✅ Verify OTP & Generate Token
exports.verifyOTP = async (req, res) => {
  const { token, enteredOtp } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp !== parseInt(enteredOtp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const [user, created] = await User.findOrCreate({
      where: { mobileNumber: decoded.mobileNumber },
      defaults: { mobileNumber: decoded.mobileNumber }, // Only set mobile number for new users
    });

    // Generate a new token with verification
    const newToken = jwt.sign(
      { userId: user.id, mobileNumber: user.mobileNumber, is_verified: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: created ? "New user created" : "User exists",
      token: newToken,
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error });
  }
};

exports.updateUser = async (req, res) => {
  const { token, ...updatedFields } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update(updatedFields);
    
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
