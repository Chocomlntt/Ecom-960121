const express = require("express");
const app = express();

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(express.json());

// Import routes
const productsRoutes = require("./routes/products");

// Mount route
app.use("/api/products", productsRoutes);

module.exports = app;