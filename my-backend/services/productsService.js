async function getAllProducts(category) {
  try {
    const filePath = path.join(__dirname, "../data/products.json");
    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    // ✅ ถ้ามี category → filter
    if (category) {
      return products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // ✅ ไม่มี → return ทั้งหมด
    return products;

  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
}