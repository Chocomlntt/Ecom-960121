const productsService = require("../services/productsService");

/**
 * Controller: Handles HTTP request & response
 */
async function getAllProducts(req, res) {
  try {
    // Call service to get data
    const products = await productsService.getAllProducts();

    // Send response back to client
    res.status(200).json(products);

  } catch (error) {
    console.error("Controller Error:", error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
}

module.exports = {
  getAllProducts
};