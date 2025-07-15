//
const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const globalError = require(`../error/globalError.js`);

const BaseDb = require(`../db/basedb/basedb.js`);
const basedb = new BaseDb();
class Product {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  // create
  createProduct = async (req, res) => {
    const product = new ProductEntity(req.body);

    const [newProduct] = await basedb.add(`products`, product);
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
  };

  // Get Product
  getProduct = async (req, res) => {
    const containerId = req.params.id;

    const products = await basedb.select("products", {
      container_id: containerId,
    });

    // await db("products").where("container_id", containerId);

    res.status(200).json({ success: true, products });
  };

  // delete
  deleteProduct = async (req, res, next) => {
    const productId = req.params.id;

    const products = await basedb.select("products", { id: productId });
    if (!products || products.length === 0) {
      return next(new globalError("Product not found", 404));
    }
    const product = products[0];
    const containerId = product.container_id;

    await basedb.deleteById("products", { id: productId });

    const productCount = await basedb.countById("products", {
      container_id: containerId,
    });

    await basedb.update(
      "container",
      { id: containerId },
      { number_of_products: productCount }
    );

    res.json({ success: true, message: "Product removed" });
  };
}

module.exports = Product;
