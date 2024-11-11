const Finance = require("../models/Finance");

// Create a new finance application
exports.createFinance = async (req, res) => {
  try {
    const newFinance = new Finance(req.body);
    await newFinance.save(); // Save the new document
    res.status(201).json(newFinance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all finance applications
exports.getFinances = async (req, res) => {
  try {
    const finances = await Finance.find();
    res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing finance application
exports.updateFinance = async (req, res) => {
  try {
    const updatedFinance = await Finance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedFinance) {
      return res.status(404).json({ message: "Finance application not found" });
    }
    res.status(200).json(updatedFinance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a finance application
exports.deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findByIdAndDelete(req.params.id);
    if (!finance) {
      return res.status(404).json({ message: "Finance application not found" });
    }
    res.status(200).json({ message: "Finance application deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
