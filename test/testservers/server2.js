const express = require(`express`);
const app = express();
const bcrypt = require(`bcrypt`);

app.use(express.json());

const users = [];

// get users
app.get(`/users`, (req, res) => {
  res.json({ users });
});

// post users
app.post(`/users`, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      password: hashPassword,
    };
    users.push(user);
    res.status(201).send();
  } catch {
    console.error(error);
    res.status(500).send();
  }
});

// login
app.post(`/users/login`, async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) return res.status(400).send(`user does not exist`);
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`Done!`);
    } else {
      res.send(`wrong password`);
    }
  } catch {
    res.status(500).send();
  }
});
// server listening
app.listen(5000);
