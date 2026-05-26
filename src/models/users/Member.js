const mongoose = require("mongoose");

const User = require("./User");

const memberSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
  },

  membershipNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = User.discriminator("member", memberSchema);