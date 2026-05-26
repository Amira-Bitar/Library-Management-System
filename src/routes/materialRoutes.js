const express = require("express");
const asyncHandler = require("./../utils/asyncHandler");

const router = express.Router();

const {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

router.route("/")
  .post(asyncHandler(createMaterial))
  .get(asyncHandler(getAllMaterials));

router.route("/:id")
  .get(asyncHandler(getMaterialById))
  .put(asyncHandler(updateMaterial))
  .delete(asyncHandler(deleteMaterial));

module.exports = router;