const express = require("express");
const { getMyProfile, getUserById } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/myProfile", authMiddleware, getMyProfile); // Fetch own profile
router.get("/:id", authMiddleware, getUserById); // Fetch another user by ID
router.get("/debug-token", authMiddleware, (req, res) => {
    res.json({ userFromToken: req.user });
  });

module.exports = router;
