const express = require("express");
const asyncHandler = require("./../utils/asyncHandler");

const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/")
  .post(asyncHandler( createUser))
  .get(asyncHandler(getAllUsers));

router.route("/:id")
  .get(asyncHandler(getUserById))
  .put(asyncHandler(updateUser))
  .delete(asyncHandler(deleteUser));

module.exports = router;