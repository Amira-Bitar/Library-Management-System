const mongoose = require("mongoose");

const Material = require("./Material");

const cdSchema = new mongoose.Schema({
    artist: {
      type: String,
      required: true,
  },
});

module.exports = Material.discriminator(
  "cd",
  cdSchema
);