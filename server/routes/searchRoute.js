const express = require("express");
const router = express.Router();
const {
  getSearchResults,
  getAllItems,
  saveLink,
  removeItem,
  removeAllItems,
} = require("../controllers/searchControllers");

// @base-uri    /api/probenexus

// @desc    search functionality
// @route   POST /search
router.post("/search", getSearchResults);

// @desc   get all items
// @route   GET /my-items
router.get("/my-items", getAllItems);

// @desc   save functionality
// @route   POST /
router.post("/", saveLink);

// @desc   remove item
// @route   DELETE /:id
router.delete("/:id", removeItem);

// @desc   remove all items
// @route   DELETE /
router.delete("/", removeAllItems);

module.exports = router;
