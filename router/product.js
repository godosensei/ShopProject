const express = require(`express`);
const router = express.Router();
const ProductController = require(`../controller/productController`);
const controller = new ProductController();

const { productvalidator } = require(`../validation/validator`);

// POST route to insert product
router.post("/", productvalidator, controller.newProduct);

// Get products
router.get("/:id/:page", controller.getProductByContainer);

// Delete products
router.delete("/:id", controller.removeProduct);

module.exports = router;
