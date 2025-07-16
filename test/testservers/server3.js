require(`dotenv`).config();
const express = require(`express`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const app = express();
app.use(express.json());

let users = []; // In-memory user list
let refreshTokens = []; // In-memory token list

// signup
app.post(`/signin`, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send("User Registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

// Login Create Tokens
app.post(`/login`, async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (!user) return res.status(400).send("User not found");

  try {
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(403).send("Invalid password");

    const userPayload = { name: user.name };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Access Token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "20s" });
}

// Token Refresh
app.post(`/token`, (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

// Logout
app.delete(`/logout`, (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.get(`/protected`, authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.name}, you are authorized!`);
});

// Middleware  Authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Start Server
app.listen(5000);
