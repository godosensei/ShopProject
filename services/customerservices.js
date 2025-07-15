require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const BaseDb = require(`../db/basedb/basedb.js`);
const basedb = new BaseDb();

const refreshTokens = [];

const { CustomerEntity } = require(`../dto/dto`);

const globalError = require(`../error/globalError.js`);

class Customer {
  //
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  //
  customerSignin = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const customer = new CustomerEntity({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      role: "customer",
    });
    const [newCustomer] = await basedb.add(`Customer`, customer);

    res.status(201).json({ success: true, customer: newCustomer });
  };
  //

  customerLogin = async (req, res, next) => {
    const { name, password } = req.body;

    // get user
    const [user] = await basedb.select(`Customer`, { name });

    if (!user) {
      return next(new globalError(`User not found`, 400));

      // res.status(400).send("User not found");
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new globalError(`Invalid password`, 403));

    // res.status(403).send("Invalid password");

    res.send(`loged in!`);
  };
}

module.exports = Customer;
