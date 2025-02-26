const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Get user details from token
exports.getMyProfile = async (req, res) => {
  try {
    const { mobileNumber } = req.user; // Extract mobileNumber from token
    const user = await User.findOne({ 
      where: { mobileNumber }, 
      attributes: { exclude: ["password"] } 
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};


// Get another user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
