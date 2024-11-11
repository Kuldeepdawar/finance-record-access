const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    personalDetails: {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
    },
    income: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    assets: {
      type: Number,
      required: true,
    },
    liabilities: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Finance", financeSchema);
