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
  constructor() {}

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
    const [newCustomer] = await basedb.add(`customer`, customer);

    res.status(201).json({
      success: true,
      name: newCustomer.name,
      email: newCustomer.email,
    });
  };
  //

  customerLogin = async (req, res, next) => {
    const { name, password } = req.body;

    // get user
    const [user] = await basedb.select(`customer`, { name });

    if (!user) {
      return next(new globalError(`User not found`, 400));

      // res.status(400).send("User not found");
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new globalError(`Invalid password`, 403));

    // res.status(403).send("Invalid password");

    res.send(`${user.name} loged in!`);
  };

  //
  getProducts = async (req, res, next) => {
    try {
      const id = req.body.id;
      const amount = req.body.amount;

      const product = await basedb.selectOne("products", { id });

      if (!product) {
        return next(new globalError(`Product not found`, 404));
      }

      const sold = product.sold_products + amount;
      const current = product.total_products - sold;

      if (product.current_products <= 0) {
        return res.send(`!Sold`);
      }

      const [updatedProduct] = await basedb.update(
        `products`,
        { id },
        { sold_products: sold, current_products: current }
      );
      //  await db("products")
      //   .where({ id })
      //   .update({
      //     sold_products: sold,
      //     current_products: product,
      // })
      // .returning("*");

      res.status(200).json({
        success: true,
        product: updatedProduct,
        message: `${amount} Product(s) sold.`,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}

//
module.exports = Customer;
