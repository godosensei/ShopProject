//
const Container = require(`../services/containerServices`);
const containerservice = new Container();
//
class ContainerController {
  //
  newContainer = async (req, res) => {
    try {
      containerservice.createContainer(res, req);
    } catch (err) {
      console.error("Insert error:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to add container" });
    }
  };

  //

  removeContainer = async (req, res) => {
    try {
      containerservice.deleteContainer(res, req);
    } catch (err) {
      console.error("Delete error:", err.message);
      res
        .status(500)
        .json({ success: false, error: "Failed to remove container" });
    }
  };
}

module.exports = ContainerController;
