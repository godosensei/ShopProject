require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const globalError = require("../error/globalError.js");
const { Admin } = require(`../db/db.js`);
const BaseDb = require("../db/basedb/basedb.js");
const admindb = new BaseDb(Admin);

const refreshTokens = [];

class Admins {
  constructor() {}

  adminSignIn = async (req, res, next) => {
    try {
      const adminCount = await admindb.count();

      if (adminCount > 0) {
        return next(new globalError("An admin already exists", 400));
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create admin directly using Mongoose model
      const newAdmin = await admindb.add({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        role: "admin",
      });

      res.status(201).json({ success: true, admin: newAdmin });
    } catch (err) {
      next(err);
    }
  };

  adminLogin = async (req, res, next) => {
    try {
      const { name, password } = req.body;

      const user = await admindb.selectOne({ name });

      if (!user) {
        return next(new globalError("Admin not found", 400));
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return next(new globalError("Invalid Password", 403));

      const userPayload = { id: user._id, name: user.name };
      const accessToken = generateAccessToken(userPayload);
      const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken);

      res.json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  };

  adminLogout = async (req, res) => {
    const index = refreshTokens.indexOf(req.body.token);
    if (index !== -1) refreshTokens.splice(index, 1);

    res.sendStatus(204);
  };
}

// Create Access Token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
}

// Middleware Authenticate Token
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

module.exports = Admins;
