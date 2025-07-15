const express = require(`express`);
const router = express.Router();
const {
  newContainer,
  removeContainer,
} = require(`../controller/containerController`);

const { containerValidator } = require(`../validation/validator`);

// POST route to insert container
router.post("/", containerValidator, newContainer);

// Delete container
router.delete(`/:id`, containerValidator, removeContainer);

module.exports = router;
