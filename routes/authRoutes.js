const express = require("express");
const { sendOTP, verifyOTP, registerUser } = require("../controller/authController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Define Routes
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);
router.get("/protected-route",authenticateUser,(req,res)=>{
    res.json({
        message:"This is protected-route",
        user:req.user
    })
})

module.exports = router;
