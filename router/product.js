const express = require(`express`);
const router = express.Router();
const {
  newProduct,
  getProductByContainer,
  removeProduct,
} = require(`../controller/productController`);

const { productvalidator } = require(`../validation/validator`);

// POST route to insert product
router.post("/", productvalidator, newProduct);

// Get products
router.get("/:id", getProductByContainer);

// Delete products
router.delete("/:id", productvalidator, removeProduct);

module.exports = router;
