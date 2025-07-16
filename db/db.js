const mongoose = require("mongoose");

const containerSchema = new mongoose.Schema(
  {
    number_of_products: { type: Number },
    container_number: { type: Number },
    dilivered_from: { type: String },
    means_of_transport: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  product_type: { type: String },
  current_products: { type: Number },
  total_products: { type: Number },
  container_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Container",
    required: true,
  },
});

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});

const adminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});

const Container = mongoose.model("Container", containerSchema);
const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  Container,
  Product,
  Customer,
  Admin,
};
