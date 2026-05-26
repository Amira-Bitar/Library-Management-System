const mongoose = require("mongoose");

const User = require("./User");

const librarianSchema = new mongoose.Schema({
  responsibleDepartment: {
    type: String,
    required: true,
  },
});

module.exports = User.discriminator(
  "librarian",
  librarianSchema
);