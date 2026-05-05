const fs = require('fs').promises;
const path = require('path');

async function getAllProducts(category) {
  try {
    const filePath = path.join(__dirname, "../data/products.json");
    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    if (category) {
      return products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    return products;

  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
}

// 👇 ต้องมีอันนี้
module.exports = {
  getAllProducts
};