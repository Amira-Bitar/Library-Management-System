const mongoose = require("mongoose");

const options = {
  discriminatorKey: "role",
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate:{
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "صيغة الإيميل غير صحيحة"
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["member", "librarian", "manager"],
    },
    phone: String,

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    password: {
      type: String,
      required: true,
    },
  },
  options
);
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Email already exists'));
    } else if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        next(new Error(messages.join(', ')));
    } else {
        next(error);
    }
});
module.exports = mongoose.model("User", userSchema);