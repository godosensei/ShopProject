//
const {
  createContainer,
  deleteContainer,
} = require(`../services/containerServices`);
//

const newContainer = async (req, res) => {
  try {
    createContainer(res, req);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, error: "Failed to add container" });
  }
};

//

const removeContainer = async (req, res) => {
  try {
    deleteContainer(res, req);
  } catch (err) {
    console.error("Delete error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove container" });
  }
};

module.exports = {
  newContainer,
  removeContainer,
};
