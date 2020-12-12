const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const users = [];

const port = process.env.PORT || 8080;
const corsOptions = {
  origin: 'http://localhost:8080',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      name: req.body.name,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ message: 'Something went wrong adding a user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ message: 'Successfully logged in' });
    } else {
      res.status(200).json({ message: 'Oops' });
    }
  } catch {
    res.status(200).json({ message: 'Error' });
  }
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    // eslint-disable-next-line
    console.log(`server listening on port: ${port}`);
  }
});
