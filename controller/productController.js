//
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const Product = require(`../services/productServices`);
const productservice = new Product();
//

class ProductController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  //
  newProduct = async (req, res) => {
    try {
      productservice.createProduct(req, res);
    } catch (err) {
      console.error("Insert error:", err.message);
      res.status(500).json({ success: false, error: "Failed to add product" });
    }
  };

  //
  getProductByContainer = async (req, res) => {
    try {
      productservice.getProduct(req, res);
    } catch (err) {
      console.error("Fetch error:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch products" });
    }
  };

  //
  removeProduct = async (req, res) => {
    try {
      productservice.deleteProduct(req, res);
    } catch (err) {
      console.error("Delete error:", err.message);
      res
        .status(500)
        .json({ success: false, error: "Failed to remove product" });
    }
  };
}

//
module.exports = ProductController;
