const express = require("express");
const url = require("url");
const router = express.Router();
const needle = require("needle");
const logger = require("../logger");
const apicache = require("apicache");

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

let cache = apicache.middleware;

router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      ...url.parse(req.url, true).query,
    });

    const response = await needle("get", `${API_URL}?${params}`);
    const responseData = response.body;

    res.status(200).json(responseData); // this response has to be modified.

    logger.info(req.url.split("=")[1]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
