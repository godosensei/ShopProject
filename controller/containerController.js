const Container = require(`../services/containerServices`);
const containerservice = new Container();
const globalError = require(`../error/globalError`);

class ContainerController {
  newContainer = async (req, res, next) => {
    try {
      await containerservice.createContainer(req, res, next);
    } catch (err) {
      console.error("Insert error:", err);
      return next(new globalError(`Failed to add container`, 500));
    }
  };

  getContainers = async (req, res, next) => {
    try {
      await containerservice.readContainer(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  removeContainer = async (req, res, next) => {
    try {
      await containerservice.deleteContainer(req, res, next);
    } catch (err) {
      console.error("Delete error:", err.message);
      return next(new globalError(`Failed to remove container`, 500));
    }
  };
}

module.exports = ContainerController;
