const url = require("url");
const needle = require("needle");
const logger = require("../utils/logger");
const linkInfo = require("../mongodb/model/linkInfoModel");

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

// @base-uri    /api/probenexus

// @desc   search functionality
// @route   GET /search
const getSearchResults = async (req, res) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      ...url.parse(req.url, true).query,
    });

    const response = await needle("get", `${API_URL}?${params}`);
    const responseData = response.body;

    const formattedResults = responseData.items.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));

    res.status(200).json(formattedResults);

    if ((process.env.NODE_ENV = "development")) {
      logger.info(req.url.split("=")[1]);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// @desc   get all items
// @route   GET /my-items
const getAllItems = async (req, res) => {
  linkInfo
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc   search functionality
// @route   POST /
const saveLink = async (req, res) => {
  const { tag, title, snippet, link } = req.body;

  const item = await linkInfo.create({
    tag,
    title,
    snippet,
    link,
  });

  if (item) {
    res.status(201).json({
      _id: item._id,
      tag: item.tag,
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    });
  } else {
    res.status(400).json({ error: "Error saving..." });
  }
};

// @desc   remove item
// @route   DELETE /:id
const removeItem = (req, res) => {
  const id = req.params.id;
  linkInfo
    .findByIdAndDelete(id)
    .then((result) => {
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getSearchResults,
  getAllItems,
  saveLink,
  removeItem,
};
