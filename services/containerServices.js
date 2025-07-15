//
const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ContainerEntity } = require(`../dto/dto`);

//
class Container {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  // create
  createContainer = async (res, req) => {
    const container = new ContainerEntity(req.body);
    const [newContainer] = await db("container")
      .insert(container)
      .returning("*");
    res.status(201).json({ success: true, container: newContainer });
  };

  // delete
  deleteContainer = async (res, req) => {
    const containerId = req.params.id;
    // get container id
    const container = await db("container").where("id", containerId).first();

    if (!container) {
      return res
        .status(404)
        .json({ success: false, error: "container not found" });
    }
    // Delete
    await db(`container`).where(`id`, containerId).del();
    res.json({ success: true, message: "Container removed" });
  };
}

module.exports = Container;
