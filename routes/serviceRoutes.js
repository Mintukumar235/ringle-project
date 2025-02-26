const express = require("express");
const { getAllServices,createService } = require("../controller/serviceController");

const router = express.Router();

router.get("/", getAllServices);
router.post("/create", createService); // Get all services

module.exports = router;