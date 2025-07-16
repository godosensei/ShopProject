require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AdminController = require("../controller/adminController");
const controller = new AdminController();

const { uservalidator } = require("../validation/validator");

//
router.post("/signin", uservalidator, controller.createAdmin);

//
router.post("/login", uservalidator, controller.loginAdmin);

//
router.delete("/logout", controller.logoutAdmin);

//
router.get("/me", authenticateToken, controller.getAdmin);

//
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
