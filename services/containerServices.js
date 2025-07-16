const { ContainerEntity } = require(`../dto/dto`);
const { Container } = require(`../db/db.js`);
const BaseDb = require("../db/basedb/basedb.js");
const basedb = new BaseDb(Container);
const globalError = require(`../error/globalError.js`);
const mongoose = require("mongoose");

class Containers {
  // create
  createContainer = async (req, res, next) => {
    try {
      const container = new ContainerEntity(req.body);
      const newContainer = await basedb.add(container);
      res.status(201).json({ success: true, container: newContainer });
    } catch (err) {
      next(err);
    }
  };

  // delete
  deleteContainer = async (req, res, next) => {
    try {
      const containerId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(containerId)) {
        return next(new globalError("Invalid container ID", 400));
      }

      const container = await basedb.selectOne({ _id: containerId });
      if (!container) {
        return next(new globalError(`Container not found`, 404));
      }

      await basedb.deleteById({ _id: containerId });
      res.json({ success: true, message: "Container removed" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = Containers;
