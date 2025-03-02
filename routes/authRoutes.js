const express = require("express");
const { sendOTP, verifyOTP, updateUser } = require("../controller/authController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/update", updateUser);
router.get("/protected-route",authenticateUser,(req,res)=>{
    res.json({
        message:"This is protected-route",
        user:req.user
    })
})

module.exports = router;
