const mongoose = require("mongoose");

const User = require("./User");

const managerSchema = new mongoose.Schema({
  
});

module.exports = User.discriminator(
  "manager",
  managerSchema
);