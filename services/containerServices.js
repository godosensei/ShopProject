//
const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ContainerEntity } = require(`../dto/dto`);

const BaseDb = require(`../db/basedb/basedb.js`);
const basedb = new BaseDb();

//
class Container {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  // create
  createContainer = async (res, req) => {
    const container = new ContainerEntity(req.body);
    const [newContainer] = await basedb.add(`container`, container);
    res.status(201).json({ success: true, container: newContainer });
  };

  // delete
  deleteContainer = async (res, req) => {
    const containerId = req.params.id;
    // get container id
    const container = await basedb.select(`container`, { id: containerId });

    if (!container) {
      return res
        .status(404)
        .json({ success: false, error: "container not found" });
    }
    // Delete
    await basedb.deleteById(`container`, { id: containerId });
    res.json({ success: true, message: "Container removed" });
  };
}

module.exports = Container;
