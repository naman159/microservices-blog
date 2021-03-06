const express = require("express");
const bParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:5000/events", event); //Posts
  axios.post("http://localhost:7000/events", event); //Comments
  axios.post("http://localhost:8001/events", event); //Query Service

  res.send({ status: "OK" });
});

app.listen(8000, () => {
  console.log("Event bus online on PORT 8000");
});
