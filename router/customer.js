const express = require(`express`);
const router = express.Router();
const CustomerController = require(`../controller/customerController`);
const controller = new CustomerController();

const { uservalidator } = require(`../validation/validator`);

// POST signin a new customer
router.post("/signin", uservalidator, controller.createCustomer);

// Login
router.post(`/`, uservalidator, controller.Logincustomer);

// Buy
router.put(`/`, controller.buyProduct);

module.exports = router;
