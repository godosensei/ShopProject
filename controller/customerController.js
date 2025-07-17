//
const express = require(`express`);
const Customer = require(`../services/customerservices`);
const customerservice = new Customer();
const globalError = require(`../error/globalError.js`);

//
class CustomerController {
  createCustomer = async (req, res, next) => {
    try {
      customerservice.customerSignin(req, res);
    } catch (err) {
      console.error("Insert error:", err);
      return next(new globalError(`Failed to create customer`, 500));

      // res.status(500).json({ success: false, error: "Failed to add customer" });
    }
  };

  //
  Logincustomer = (req, res, next) => {
    try {
      customerservice.customerLogin(req, res, next);
    } catch (err) {
      console.error("Login error:", err);
      // res.status(500).send("Server error");
      return next(new globalError(`Server Error`, 500));
    }
  };

  //
  buyProduct = (req, res, next) => {
    try {
      customerservice.getProducts(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = CustomerController;
