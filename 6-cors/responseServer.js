const express = require("express");
const cors = require('cors')
const app = express();
const port = 3001;

// ここの値と違うサーバからのリクエストは拒否する
app.use(cors({origin:'http://localhost:3000'}))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/", (req, res) => {
  res.status(200).send({status:'ok'})
});
