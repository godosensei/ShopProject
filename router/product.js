const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const { productvalidator } = require(`../validation/validator`);

// POST route to insert product
router.post("/", productvalidator, async (req, res) => {
  try {
    const product = new ProductEntity(req.body);

    const [newProduct] = await db("products").insert(product).returning("*");
    const countResult = await db("products")
      .where("container_id", product.container_id)
      .count("* as count");

    const productCount = parseInt(countResult[0].count);

    await db("container")
      .where("id", product.container_id)
      .update({ number_of_products: productCount });

    res.status(201).json({
      success: true,
      product: newProduct,
      message: `Container ${product.container_id} now has ${productCount} product(s).`,
    });
  } catch (err) {
    console.error("Insert error:", err.message);
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
});

// Get products
router.get("/:id", async (req, res) => {
  try {
    const containerId = req.params.id;

    const products = await db("products").where("container_id", containerId);

    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});

// Delete products
router.delete("/:id", productvalidator, async (req, res) => {
  try {
    const productId = req.params.id;

    // Get product_id
    const product = await db("products").where("id", productId).first();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const containerId = product.container_id;

    // Delete product
    await db("products").where("id", productId).del();

    // Update container product count
    const countResult = await db("products")
      .where("container_id", containerId)
      .count("* as count");

    const productCount = parseInt(countResult[0].count);

    await db("container")
      .where("id", containerId)
      .update({ number_of_products: productCount });

    res.json({ success: true, message: "Product removed" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ success: false, error: "Failed to remove product" });
  }
});

module.exports = router;
