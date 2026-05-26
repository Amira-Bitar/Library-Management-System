const mongoose = require("mongoose");

const Material = require("./Material");

const bookSchema = new mongoose.Schema({  
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    
   publisher: {
          type: String,
          required: true,
        },
  publicationYear: {
      type: Number,
    }
});

module.exports = Material.discriminator(
  "book",
  bookSchema
);