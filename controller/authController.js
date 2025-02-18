const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const OTP_STORE = {}; // Store OTP temporarily

// ✅ Send OTP
exports.sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) return res.status(400).json({ message: "Mobile number required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  OTP_STORE[mobileNumber] = otp; // Store OTP temporarily

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

// ✅ Verify OTP & Generate Token
exports.verifyOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (OTP_STORE[mobileNumber] !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete OTP_STORE[mobileNumber]; // Remove OTP after verification

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is missing" });
  }

  const token = jwt.sign({ mobileNumber }, process.env.JWT_SECRET, { expiresIn: "7d" });

  let user = await User.findOne({ where: { mobileNumber } });

  if (user) {
    return res.json({ message: "User exists", token, newUser: false, user });
  } else {
    return res.json({ message: "New user, proceed to registration", token, newUser: true });
  }
};


exports.registerUser = async (req, res) => {
  const { token, firstName, lastName, email, password, device, deviceToken, latitude, longitude, city, address, pincode, regionId } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mobileNumber = decoded.mobileNumber;

    let user = await User.findOne({ where: { mobileNumber } });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      mobileNumber,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      device,
      deviceToken,
      latitude,
      longitude,
      city,
      address,
      pincode,
      regionId,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
