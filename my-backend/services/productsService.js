const fs = require("fs").promises;
const path = require("path");

/**
 * Service: Responsible for data fetching / business logic
 */
async function getAllProducts() {
  try {
    // Resolve path to JSON file
    const filePath = path.join(__dirname, "../data/products.json");

    // Read file asynchronously
    const data = await fs.readFile(filePath, "utf-8");

    // Convert JSON string → JS object
    const products = JSON.parse(data);

    return products;

  } catch (error) {
    console.error("Service Error:", error);
    throw error; // Let controller handle response
  }
}

module.exports = {
  getAllProducts
};