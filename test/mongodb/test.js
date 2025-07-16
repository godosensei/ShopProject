const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();
const User = require(`./user.js`);
app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/appdb`);

async function run(name, age) {
  const user = await User.create({
    name: name,
    age: age,
  });
  console.log(user);
}

app.post(`/`, async (req, res) => {
  try {
    // console.log("BODY:", req.body);

    const name = req.body.name;
    const age = req.body.age;

    await run(name, age);
    res.send(`created`);
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).send(err.message);
  }
});

//
app.get(`/`, async (req, res) => {
  try {
    const id = req.query.id;
    const name = req.query.name;
    const iduser = await User.findById(id);
    const user = await User.find({ name: name });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//
app.listen(5000);
