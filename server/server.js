const { urlencoded } = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 1010;
const routes = require("./routes/searchRoute");

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/probenexus", routes);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
