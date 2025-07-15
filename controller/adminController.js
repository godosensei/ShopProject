require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const Admin = require(`../services/adminServices`);
const refreshTokens = [];
const adminservice = new Admin();

const globalError = require(`../error/globalError.js`);

const { uservalidator } = require(`../validation/validator`);

//
class AdminController {
  //
  createAdmin = async (req, res, next) => {
    try {
      await adminservice.adminSignIn(req, res, next);
    } catch (err) {
      console.error("Admin insert error:", err.message);
      // res.status(500).json({ success: false, error: "Failed to create admin" });
      return next(new globalError(`Failed to create admin`, 500));
    }
  };

  //
  loginAdmin = async (req, res, next) => {
    try {
      await adminservice.adminLogin(req, res, next);
    } catch (err) {
      console.error("Login error:", err);
      return next(new globalError(`Server error`, 500));
      // res.status(500).send("Server error");
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
