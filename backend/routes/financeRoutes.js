// Finance routes for finance API
const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");

router.post("/add", financeController.createFinance);
router.get("/get", financeController.getFinances);
router.put("/update/:id", financeController.updateFinance);
router.delete("/delete/:id", financeController.deleteFinance);

module.exports = router;
