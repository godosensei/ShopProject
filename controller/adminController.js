require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const {
  adminSignIn,
  adminLogin,
  adminLogout,
} = require(`../services/adminServices`);
const refreshTokens = [];

const { uservalidator } = require(`../validation/validator`);

//
const createAdmin = async (req, res) => {
  try {
    adminSignIn(req, res);
  } catch (err) {
    console.error("Admin insert error:", err.message);
    res.status(500).json({ success: false, error: "Failed to create admin" });
  }
};

//
const loginAdmin = async (req, res) => {
  try {
    adminLogin(req, res);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
};

//
const logoutAdmin = (req, res) => {
  adminLogout(req, res);
};

//
const getAdmin = (req, res) => {
  res.send(`Hello ${req.user.name}, you are authorized!`);
};

//
module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmin,
};
