const { Product, Container } = require(`../db/db.js`);
const BaseDb = require("../db/basedb/basedb.js");
const { ProductEntity } = require(`../dto/dto`);
const globalError = require(`../error/globalError.js`);

const productdb = new BaseDb(Product);
const containerdb = new BaseDb(Container);

class Products {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  // create
  createProduct = async (req, res) => {
    const product = new ProductEntity(req.body);

    const newProduct = await productdb.add(product);

    // count products in this container
    const productCount = await productdb.countById({
      container_id: product.container_id,
    });

    // update container's number_of_products
    await containerdb.update(
      { _id: product.container_id },
      { number_of_products: productCount }
    );

    res.status(201).json({
      success: true,
      product: newProduct,
      message: `Container ${product.container_id} now has ${productCount} product(s).`,
    });
  };

  // Get products by container ID
  getProduct = async (req, res) => {
    const containerId = req.params.id;

    const products = await productdb.select({ container_id: containerId });

    res.status(200).json({ success: true, products });
  };

  // delete product
  deleteProduct = async (req, res, next) => {
    const productId = req.params.id;

    const product = await productdb.selectOne({ _id: productId });
    if (!product) {
      return next(new globalError("Product not found", 404));
    }

    const containerId = product.container_id;

    await productdb.deleteById({ _id: productId });

    // Recount products after deletion
    const productCount = await productdb.countById({
      container_id: containerId,
    });

    // Update container's product count
    await containerdb.update(
      { _id: containerId },
      { number_of_products: productCount }
    );

    res.json({ success: true, message: "Product removed" });
  };
}

module.exports = Products;
