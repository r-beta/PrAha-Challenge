const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send({ text: "hello world" });
});

app.post("/", (req, res) => {
  const contentType = req.headers["content-type"];
  console.log(contentType);
  console.log(req.body);
  if (contentType === "application/json") {
    res.status(201).send(req.body);
  } else {
    res.status(400).send("content-type is not application/json");
  }
});
