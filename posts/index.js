const express = require('express');
const bParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(bParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts)
;})

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  res.status(201).send(posts[id]);
})

app.listen(5000, () => {
  console.log(`Posts online on PORT 5000`);
})
