const express = require("express");
const asyncHandler = require("./../utils/asyncHandler");

const router = express.Router();

const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

router.route("/")
  .post(asyncHandler(createReservation))
  .get(asyncHandler(getAllReservations));

router.route("/:id")
  .get(asyncHandler(getReservationById))
  .put(asyncHandler(updateReservation))
  .delete(asyncHandler(deleteReservation));

module.exports = router;