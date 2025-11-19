const Quotation = require("../models/quotation");
const User = require("../models/user");
const Company = require("../models/company");


// Create new quotation
exports.createQuotation = async (req, res) => {
  try {
    const { companyId, customerDetails, products, totalAmount } = req.body;

    const newQuotation = await Quotation.create({
      companyId,
      customerDetails,
      products,
      totalAmount,
    });

    res.status(201).json({
      message: "Quotation created successfully",
      quotation: newQuotation,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get all quotations (company-wise)
exports.getQuotations = async (req, res) => {
  try {
    const { companyId } = req.query;
    const filter = companyId ? { companyId } : {};

    const quotations = await Quotation.find(filter)
      .populate("companyId")
      .sort({ createdAt: -1 });

    res.status(200).json(quotations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get single quotation
exports.getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id).populate("companyId");

    if (!quotation)
      return res.status(404).json({ message: "Quotation not found" });

    res.status(200).json(quotation);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Update quotation (status or customer/products)
exports.updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuotation = await Quotation.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Quotation updated successfully",
      quotation: updatedQuotation,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Delete quotation
exports.deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    await Quotation.findByIdAndDelete(id);
    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//  Super API
exports.dashboardSummary = async (req, res) => {
  try {
    const companyId = req.headers.companyid;
    console.log("cmpany id in headre ==>", companyId);
    

    if (!companyId) {
      return res
        .status(400)
        .json({ message: "companyId is required in headers" });
    }

    //  1) Get ALL quotations for the company
    const quotations = await Quotation.find({ companyId }).sort({
      createdAt: -1,
    });

    //  2) Get ALL users for the company
    const users = await User.find({ companyId });

    return res.status(200).json({
      quotations, // full quotations array
      users, // full staff array
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};


