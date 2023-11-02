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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.options(
  "/api/probenexus/my-items",
  cors({
    origin: "http://localhost:3000/myItems",
    methods: "GET",
    credentials: true,
  })
);
app.options("/api/probenexus/search", cors());

app.use("/api/probenexus", routes);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
