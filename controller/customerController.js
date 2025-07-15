//
const express = require(`express`);
const Customer = require(`../services/customerservices`);
const customerservice = new Customer();
//
class CustomerController {
  createCustomer = async (req, res) => {
    try {
      customerservice.customerSignin(req, res);
    } catch (err) {
      console.error("Insert error:", err);
      res.status(500).json({ success: false, error: "Failed to add customer" });
    }
  };

  //
  Logincustomer = (req, res) => {
    try {
      customerservice.customerLogin(req, res);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Server error");
    }
  };
}

module.exports = CustomerController;
