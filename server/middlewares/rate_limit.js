const rateLimit = require("express-rate-limit");

const limitingRequests = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
});

module.exports = limitingRequests;
