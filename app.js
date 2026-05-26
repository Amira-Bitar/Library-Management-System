const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
const materialRoutes = require("./src/routes/materialRoutes");
const loanRoutes = require("./src/routes/loanRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/materials", materialRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/reviews", reviewRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });


app.listen(process.env.PORT, () => {
   console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
}); 

app.use((err, req, res, next) => {

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate entry detected"
    });
  }

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message
  });
});