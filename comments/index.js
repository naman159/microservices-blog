const express = require("express");
const bParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(cors());
app.use(bParser.json());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const commentsById = comments[req.params.id] || [];

  commentsById.push({ id, content });

  comments[req.params.id] = commentsById;

  await axios.post("http://localhost:8000/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id
    }
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(7000, () => {
  console.log(`Comments online on PORT 7000`);
});
