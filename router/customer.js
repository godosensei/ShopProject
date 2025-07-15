const express = require(`express`);
const router = express.Router();
const CustomerController = require(`../controller/customerController`);
const controller = new CustomerController();

const { uservalidator } = require(`../validation/validator`);

// POST signin a new customer
router.post("/signin", uservalidator, controller.createCustomer);

// Login
router.post(`/login`, uservalidator, controller.Logincustomer);

module.exports = router;
