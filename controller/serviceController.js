const Service = require("../models/Service");

// ✅ Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

exports.createService = async (req, res) => {
  try {
    const { id, discount, discountType, regionId, currency } = req.body;
    const service = await Service.create({ id, discount, discountType, regionId, currency });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};