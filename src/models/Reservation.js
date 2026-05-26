const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
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
    reservedAt: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    queuePriority: {
      type: Number,
      required: true,
    },

    notifiedWhenAvailable: {
      type: Boolean,
      default: false,
    },

    autoCancelAfter: {
      type: Date,
      default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Reservation",
  ReservationSchema
);