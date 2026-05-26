const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {

      // Relationships
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true,
      },

      librarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // Loan info
      loanDate: {
        type: Date,
        default: Date.now,
      },

      dueDate: {
        type: Date,
        required: true,
      },

      actualReturnDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: ["active", "returned", "overdue", "cancelled"],
        default: "active",
      },

      // Fine system
      finePerDay: {
        type: Number,
        default: 2,
      },

      totalFineAmount: {
        type: Number,
        default: 0,
      },

      paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Loan",
  LoanSchema
);