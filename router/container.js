const express = require(`express`);
const router = express.Router();
const ContainerController = require(`../controller/containerController`);
const controller = new ContainerController();

const { containerValidator } = require(`../validation/validator`);

// POST route to insert container
router.post("/", containerValidator, controller.newContainer);

// Delete container
router.delete(`/:id`, containerValidator, controller.removeContainer);

// Get
router.get(`/:page`, controller.getContainers);

module.exports = router;
