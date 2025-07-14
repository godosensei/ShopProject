require(`dotenv`).config();

const express = require(`express`);
const app = express();
const jwt = require(`jsonwebtoken`);

let refreshTokens = [];

app.use(express.json());

// Check Token
app.post(`/token`, (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// Logout Route
app.delete(`/logout`, (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});
// Login Route
app.post(`/login`, (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const acessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);

  res.json({ accessToken: acessToken, refreshToken: refreshToken });
  refreshTokens.push(refreshToken);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "20s" });
}

// server Listening...
app.listen(4000, () => {
  console.log("server is listening...");
});
