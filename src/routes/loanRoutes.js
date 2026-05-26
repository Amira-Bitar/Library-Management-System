const express = require("express");
const asyncHandler = require("./../utils/asyncHandler");

const router = express.Router();

const {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  returnLoan,
} = require("../controllers/loanController");

router.route("/")
  .post(asyncHandler(createLoan))
  .get(asyncHandler(getAllLoans));

router.route("/:id")
  .get(asyncHandler(getLoanById))
  .put(asyncHandler(updateLoan))
  .delete(asyncHandler(deleteLoan));
router.route("/return-loan/:id").put(asyncHandler(returnLoan));
module.exports = router;