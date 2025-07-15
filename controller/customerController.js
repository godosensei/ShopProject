//
const express = require(`express`);
const {
  customerSignin,
  customerLogin,
} = require(`../services/customerservices`);

//
const createCustomer = async (req, res) => {
  try {
    customerSignin(req, res);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, error: "Failed to add customer" });
  }
};

//
const Logincustomer = (req, res) => {
  try {
    customerLogin(req, res);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createCustomer,
  Logincustomer,
};
