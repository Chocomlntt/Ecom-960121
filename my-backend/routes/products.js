const express = require("express");
const router = express.Router();

// Import controller
const productsController = require("../controllers/productsController");

/**
 * GET /api/products
 * Route layer only delegates request to controller
 */
router.get("/", productsController.getAllProducts);

module.exports = router;