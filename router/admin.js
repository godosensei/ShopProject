require(`dotenv`).config();

const {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmin,
} = require(`../controller/adminController`);

const express = require(`express`);
const router = express.Router();
const AdminController = require(`../controller/adminController`);
const controller = new AdminController();

const refreshTokens = [];

const { uservalidator } = require(`../validation/validator`);

// Post signin
router.post("/signin", uservalidator, controller.createAdmin);

// Login
router.post(`/login`, uservalidator, controller.loginAdmin);

// Logout
router.delete(`/logout`, controller.logoutAdmin);

// get
router.get(`/access`, authenticateToken, controller.getAdmin);

//
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
