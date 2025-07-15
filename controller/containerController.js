//
const Container = require(`../services/containerServices`);
const containerservice = new Container();
const globalError = require(`../error/globalError`);
//
class ContainerController {
  //
  newContainer = async (req, res, next) => {
    try {
      containerservice.createContainer(res, req);
    } catch (err) {
      console.error("Insert error:", err);
      return next(new globalError(`Failed to add container`, 500));
      // res
      //   .status(500)
      //   .json({ success: false, error: "Failed to add container" });
    }
  };

  //

  removeContainer = async (req, res, next) => {
    try {
      containerservice.deleteContainer(res, req, next);
    } catch (err) {
      console.error("Delete error:", err.message);
      return next(new globalError(`Failed to remove container`, 500));

      // res
      //   .status(500)
      //   .json({ success: false, error: "Failed to remove container" });
    }
  };
}

module.exports = ContainerController;
