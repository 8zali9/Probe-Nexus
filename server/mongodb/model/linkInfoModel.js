const mongoose = require("mongoose");

const linkInfoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const linkInfo = mongoose.model("linkInfo", linkInfoSchema);

module.exports = linkInfo;
