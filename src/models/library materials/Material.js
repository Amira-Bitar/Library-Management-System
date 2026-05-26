
const mongoose = require("mongoose");

const options = {
  discriminatorKey: "materialType",
  timestamps: true,
};

const materialSchema = new mongoose.Schema(
  {
      
    title: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "fiction",
        "science",
        "history",
        "technology",
        "geography",
        "music",
        "education",
      ],
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    coverImageUrl: {
      type: String,
    },
  
  },
  options
);

module.exports = mongoose.model(
  "Material",
  materialSchema
);