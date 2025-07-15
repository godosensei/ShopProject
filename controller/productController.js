//
const db = require(`../db/db`);
const { ProductEntity } = require(`../dto/dto`);

const {
  createProduct,
  deleteProduct,
  getProduct,
} = require(`../services/productServices`);
//
const newProduct = async (req, res) => {
  try {
    console.log(req.body);
    createProduct(req, res);
  } catch (err) {
    console.error("Insert error:", err.message);
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
};

//
const getProductByContainer = async (req, res) => {
  try {
    getProduct(req, res);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

//
const removeProduct = async (req, res) => {
  try {
    deleteProduct(req, res);
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ success: false, error: "Failed to remove product" });
  }
};

//
module.exports = {
  newProduct,
  getProductByContainer,
  removeProduct,
};
