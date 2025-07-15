require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const refreshTokens = [];

const { CustomerEntity } = require(`../dto/dto`);

customerSignin = async (req, res) => {
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
};

customerLogin = async (req, res) => {
  const { name, password } = req.body;

  // get user
  const [user] = await db("Customer").where({ name }).select("*");

  if (!user) {
    return res.status(400).send("User not found");
  }

  // Check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).send("Invalid password");

  res.send(`loged in!`);
};

module.exports = { customerSignin, customerLogin };
