const express = require(`express`);
const router = express.Router();
const {
  createCustomer,
  Logincustomer,
} = require(`../controller/customerController`);

const { uservalidator } = require(`../validation/validator`);

// POST signin a new customer
router.post("/signin", uservalidator, createCustomer);

// Login
router.post(`/login`, uservalidator, Logincustomer);

module.exports = router;
