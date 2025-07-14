const express = require(`express`);
const router = express.Router();
const db = require(`../db/db`);
const { ContainerEntity } = require(`../dto/dto`);

const { containerValidator } = require(`../validation/validator`);

// POST route to insert container
router.post("/add", containerValidator, async (req, res) => {
  try {
    const container = new ContainerEntity(req.body);
    const [newContainer] = await db("container")
      .insert(container)
      .returning("*");

    res.status(201).json({ success: true, container: newContainer });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, error: "Failed to add container" });
  }
});

// Delete container
router.delete(`/delete/:id`, containerValidator, async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Delete error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove container" });
  }
});

module.exports = router;
