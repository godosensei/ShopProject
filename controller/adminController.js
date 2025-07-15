require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const Admin = require(`../services/adminServices`);
const refreshTokens = [];
const adminservice = new Admin();

const { uservalidator } = require(`../validation/validator`);

//
class AdminController {
  //
  createAdmin = async (req, res) => {
    try {
      adminservice.adminSignIn(req, res);
    } catch (err) {
      console.error("Admin insert error:", err.message);
      res.status(500).json({ success: false, error: "Failed to create admin" });
    }
  };

  //
  loginAdmin = async (req, res) => {
    try {
      adminservice.adminLogin(req, res);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Server error");
    }
  };

  //
  logoutAdmin = (req, res) => {
    adminservice.adminLogout(req, res);
  };

  //
  getAdmin = (req, res) => {
    res.send(`Hello ${req.user.name}, you are authorized!`);
  };
}

//
module.exports = AdminController;
