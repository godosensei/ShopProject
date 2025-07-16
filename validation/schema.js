const Joi = require(`joi`);

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  productType: Joi.string().required(),
  currentProducts: Joi.number().required(),
  totalProducts: Joi.number().required(),
  containerId: Joi.string().required(),
});

const containerSchema = Joi.object({
  containerNumber: Joi.number().required(),
  diliveredFrom: Joi.string().required(),
  meansOfTransport: Joi.string().required(),
});

module.exports = { userSchema, productSchema, containerSchema };
