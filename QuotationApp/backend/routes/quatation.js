const express = require("express");
const router = express.Router();
const {
  createQuotation,
  getQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
  dashboardSummary,
} = require("../controller/quatation.controller");


router.post("/create", createQuotation);
router.get("/get", getQuotations);
router.get("/getBy/:id", getQuotationById);
router.put("/update/:id", updateQuotation);
router.delete("/delete/:id", deleteQuotation);

router.get("/dasboard-summary", dashboardSummary);

module.exports = router;
