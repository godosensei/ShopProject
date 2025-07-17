//
const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ContainerEntity } = require(`../dto/dto`);

const BaseDb = require(`../db/basedb/basedb.js`);
const basedb = new BaseDb();
const globalError = require(`../error/globalError.js`);
//
class Container {
  constructor() {
    this.tableName = "container";
    this.productTable = `products`;
  }
  // create
  createContainer = async (req, res, next) => {
    try {
      const container = new ContainerEntity(req.body);
      const [newContainer] = await basedb.add(this.tableName, container);
      res.status(201).json({ success: true, container: newContainer });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // read
  readContainer = async (req, res, next) => {
    try {
      const containers = await basedb.select("container");
      console.log(containers);
      res.json({ containers });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // delete
  deleteContainer = async (req, res, next) => {
    try {
      const containerId = req.params.id;
      console.log(containerId);
      // Check if container exists
      const container = await basedb.selectOne(this.tableName, {
        id: containerId,
      });
      if (!container) {
        return next(new globalError(`Container not found`, 404));
      }

      const deleteDate = new Date(); // current timestamp

      await basedb.alreadyDeleted(
        this.tableName,
        { id: containerId },
        `deleted_at`
      );
      // Soft delete by updating `deleted_at` field
      const updated = await basedb.update(
        this.tableName,
        { id: containerId },
        { deleted_at: deleteDate }
      );

      // soft delete products
      const updateproducts = await basedb.update(
        this.productTable,
        { container_id: containerId },
        { deleted_at: deleteDate }
      );

      // await db("products").where({ container_id: containerId }).del();

      res.json({ success: true, message: "Container removed", data: updated });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = Container;
