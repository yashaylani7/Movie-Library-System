const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.send({ success: true });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.send({ success: true });
  } else {
    res.send({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(5173, () => {
  console.log('Server is running on port 5173');
});
