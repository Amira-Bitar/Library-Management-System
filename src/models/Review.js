const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
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

    // Review data
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    reviewText: {
      type: String,
      trim: true,
    },

  },
  { timestamps: true }
);


ReviewSchema.index(
  { member: 1, material: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "Review",
  ReviewSchema
);