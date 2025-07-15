//
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const Product = require(`../services/productServices`);
const productservice = new Product();
//
const globalError = require(`../error/globalError.js`);

class ProductController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  //
  newProduct = async (req, res, next) => {
    try {
      await productservice.createProduct(req, res);
    } catch (err) {
      console.error("Insert error:", err.message);
      return next(new globalError(`Failed to add product`, 500));

      // res.status(500).json({ success: false, error: "Failed to add product" });
    }
  };

  //
  getProductByContainer = async (req, res, next) => {
    try {
      await productservice.getProduct(req, res);
    } catch (err) {
      console.error("Fetch error:", err);
      return next(new globalError(`Failed to fetch products`, 500));

      // res
      //   .status(500)
      //   .json({ success: false, error: "Failed to fetch products" });
    }
  };

  //
  removeProduct = async (req, res, next) => {
    try {
      await productservice.deleteProduct(req, res, next);
    } catch (err) {
      console.error("Delete error:", err.message);
      return next(new globalError(`Failed to remove product`, 500));

      // res
      //   .status(500)
      //   .json({ success: false, error: "Failed to remove product" });
    }
  };
}

//
module.exports = ProductController;
