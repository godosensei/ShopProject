//
const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const globalError = require(`../error/globalError.js`);

const BaseDb = require(`../db/basedb/basedb.js`);
const basedb = new BaseDb();
class Product {
  constructor() {}
  // create
  createProduct = async (req, res, next) => {
    const product = new ProductEntity(req.body);
    const container = await basedb.selectOne(`container`, {
      id: product.container_id,
    });
    console.log(container);

    if (!container) {
      return next(new globalError("Container already deleted", 400));
    }

    product.current_products = product.total_products - product.sold_products;

    const [newProduct] = await basedb.add(`products`, product);

    await db(`container`)
      .where("id", product.container_id)
      .update({ number_of_products: container.number_of_products + 1 });

    res.status(201).json({
      success: true,
      product: newProduct,
      message: `Container ${product.container_id} now has ${container.number_of_products} product(s).`,
    });
  };

  // Get Product
  getProduct = async (req, res, next) => {
    try {
      const containerId = req.params.id;

      const products = await basedb.select(`products`, {
        container_id: containerId,
      });
      const totalElems = products.length;
      const take = 2;
      const page = req.params.page;
      let skip = Math.max(0, take * (page - 1));
      const totalPages = Math.ceil(totalElems / take);
      const items = products.slice(skip, skip + take);

      console.log(items);

      res.status(200).json({ success: true, items });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // delete
  deleteProduct = async (req, res, next) => {
    const productId = req.params.id;

    const product = await basedb.selectOne(`products`, {
      id: productId,
    });
    if (!product) {
      return next(new globalError(`Product not found`, 404));
    }

    const deleteDate = new Date(); // current timestamp

    basedb.alreadyDeleted(`products`, { id: productId }, `deleted_at`);
    // Soft delete by updating `deleted_at` field
    const updated = await basedb.update(
      `products`,
      { id: productId },
      { deleted_at: deleteDate }
    );

    // const products = await basedb.select(`products`, { id: productId });
    // if (!products || products.length === 0) {
    //   return next(new globalError("Product not found", 404));
    // }
    // const product = products[0];
    // const containerId = product.container_id;

    // await basedb.deleteById(`products`, { id: productId });

    // const productCount = await basedb.countById(`products`, {
    //   container_id: containerId,
    // });

    // await basedb.update(
    //   `container`,
    //   { id: containerId },
    //   { number_of_products: productCount }
    // );

    res.json({ success: true, message: "Product removed" });
  };
}

module.exports = Product;
