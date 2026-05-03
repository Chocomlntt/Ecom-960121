const productsService = require("../services/productsService");

async function getAllProducts(req, res) {
  try {
    const { category } = req.query; // ✅ รับ query

    // 🛡 Gatekeeper
    if (category && typeof category !== "string") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid category"
      });
    }

    // ✅ ส่ง category ไป service
    const products = await productsService.getAllProducts(category);

    // ❌ ถ้าไม่เจอ
    if (category && products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found"
      });
    }

    // ✅ success format
    res.status(200).json({
      status: "success",
      data: products
    });

  } catch (error) {
    console.error("Controller Error:", error);

    res.status(500).json({
      status: "fail",
      message: "Failed to fetch products"
    });
  }
}

module.exports = {
  getAllProducts
};