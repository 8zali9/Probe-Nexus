const express = require("express");
const router = express.Router();
const apicache = require("apicache");
const {
  getSearchResults,
  getAllItems,
  saveLink,
  removeItem,
} = require("../controllers/searchControllers");

let cache = apicache.middleware;

// @base-uri    /api/probenexus

// @desc   search functionality
// @route   GET /search
router.get("/search", cache("2 minutes"), getSearchResults);

// @desc   get all items
// @route   GET /my-items
router.get("/my-items", getAllItems);

// @desc   search functionality
// @route   POST /
router.post("/", saveLink);

// @desc   remove item
// @route   DELETE /:id
router.delete("/:id", removeItem);

module.exports = router;
