require(`dotenv`).config();

const express = require(`express`);
const app = express();
const jwt = require(`jsonwebtoken`);

app.use(express.json());

const posts = [
  { username: `king`, title: `post1` },
  { username: `jhon`, title: `post2` },
];

app.get(`/posts`, authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// token authenticaion
function authenticateToken(req, res, next) {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
// server Listening...
app.listen(5000, () => {
  console.log("server is listening...");
});
