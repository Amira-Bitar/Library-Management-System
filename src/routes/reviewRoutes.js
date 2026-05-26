const express = require("express");
const asyncHandler = require("./../utils/asyncHandler");

const router = express.Router();

const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.route("/")
  .post(asyncHandler(createReview))
  .get(asyncHandler(getAllReviews));

router.route("/:id")
  .get(asyncHandler(getReviewById))
  .put(asyncHandler(updateReview))
  .delete(asyncHandler(deleteReview));

module.exports = router;