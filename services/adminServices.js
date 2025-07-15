require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const refreshTokens = [];
const { AdminEntity } = require(`../dto/dto`);

const adminSignIn = async (req, res) => {
  const existingAdmins = await db("Admin").count("* as count");
  const adminCount = parseInt(existingAdmins[0].count);
  // check if admin exist
  if (adminCount > 0) {
    return res.status(400).json({
      success: false,
      error: "An admin already exists.",
    });
  }
  // create admin if doesnt exist
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const admin = new AdminEntity({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    role: "admin",
  });

  const [newAdmin] = await db("Admin").insert(admin).returning("*");

  res.status(201).json({ success: true, admin: newAdmin });
};

const adminLogin = async (req, res) => {
  const { name, password } = req.body;

  // get user
  const [user] = await db("Admin").where({ name }).select("*");

  if (!user) {
    return res.status(400).send("Admin not found");
  }

  // Check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).send("Invalid password");

  // Create JWTs
  const userPayload = { id: user.id, name: user.name };
  const accessToken = generateAccessToken(userPayload);
  const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
};

const adminLogout = async (req, res) => {
  const index = refreshTokens.indexOf(req.body.token);
  if (index !== -1) refreshTokens.splice(index, 1);

  res.sendStatus(204);
};

// Create Access Token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
}

// Middleware  Authenticate Token
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

module.exports = { adminSignIn, adminLogin, adminLogout };
