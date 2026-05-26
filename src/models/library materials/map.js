const mongoose = require("mongoose");

const Material = require("./Material");
const mapSchema = new mongoose.Schema({  
    region: String,

});

module.exports = Material.discriminator(
  "map",
  mapSchema
);