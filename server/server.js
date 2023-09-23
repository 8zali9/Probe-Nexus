const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 1010;
const routes = require("./routes/searchRoute");
const limitingRequests = require("./middlewares/rate_limit");
const connectDB = require("./mongodb/config/connectdb");

const app = express();

connectDB();

app.use(limitingRequests);
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/probenexus", routes);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
