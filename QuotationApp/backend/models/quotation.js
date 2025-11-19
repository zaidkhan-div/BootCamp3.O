const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    customerDetails: {
      customerName: String,
      companyName: String,
      deliveryAddress: String,
      city: String,
      state: String,
      postalCode: String,
      email: String,
      phoneNumber: String,
      specialInstruction: String,
    },
    products: [
      {
        productName: String,
        unitMeasure: String,
        quantity: Number,
        unitPrice: Number,
        discountApplied: String,
        taxApplied: String,
      },
    ],
    totalAmount: { type: Number }, 
    status: {
      type: String,
      enum: ["sent", "completed", "rejected"],
      default: "sent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
