require(`dotenv`).config();
const Joi = require(`joi`);
const { userSchema, productSchema, containerSchema } = require(`./schema.js`);
const jwt = require(`jsonwebtoken`);
async function decodeAccessToken(token) {
  try {
    const dec = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!dec) {
      return;
    }
    return dec;
  } catch (error) {
    console.log(`invalid token`);
    return null;
  }
}
const tokenValidator = (schema) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")?.[1];
    if (token) {
      const dec = await decodeAccessToken(token);
      if (!dec) return res.status(403).send("Invalid or expired token");
      req["currentUser"] = dec;
    } else {
      return res.status(403).send(`token not found`);
    }

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };
};

const validator = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };
};

const uservalidator = validator(userSchema);
const productvalidator = tokenValidator(productSchema);
const containerValidator = tokenValidator(containerSchema);

module.exports = {
  uservalidator,
  productvalidator,
  containerValidator,
};
