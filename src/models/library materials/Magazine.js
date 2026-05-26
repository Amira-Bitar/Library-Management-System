const mongoose = require("mongoose");

const Material = require("./Material");

const magazineSchema = new mongoose.Schema({
    issueNumber: {
      type: Number,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },


});

module.exports = Material.discriminator(
  "magazine",
  magazineSchema
);