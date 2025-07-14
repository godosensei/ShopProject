require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const refreshTokens = [];

const { CustomerEntity } = require(`../dto/dto`);

const { uservalidator } = require(`../validation/validator`);

// POST signin a new customer
router.post("/signin", uservalidator, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const customer = new CustomerEntity({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      role: "customer",
    });
    const [newCustomer] = await db("Customer").insert(customer).returning("*");

    res.status(201).json({ success: true, customer: newCustomer });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, error: "Failed to add customer" });
  }
});

// Login
router.post(`/login`, async (req, res) => {
  try {
    const { name, password } = req.body;

    // get user
    const [user] = await db("Customer").where({ name }).select("*");

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).send("Invalid password");

    // Create JWTs
    // const userPayload = { id: user.id, name: user.name, role: user.role };
    // const accessToken = generateAccessToken(userPayload);
    // const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN);
    // refreshTokens.push(refreshToken);

    res.send(`loged in!`);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});
// Create Access Token
// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "30s" });
// }

// // Token Refresh
// router.post(`/token`, (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken });
//   });
// });

// Logout
// router.delete(`/logout`, (req, res) => {
//   const index = refreshTokens.indexOf(req.body.token);
//   if (index !== -1) refreshTokens.splice(index, 1);

//   res.sendStatus(204);
// });

// router.get(`/access`, authenticateToken, (req, res) => {
//   res.send(`Hello ${req.user.name}, you are authorized!`);
// });

// // Middleware  Authenticate Token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
