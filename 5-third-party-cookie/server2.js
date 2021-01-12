const express = require("express");
const cors = require('cors')
const app = express();
const port = 3001;

app.use(cors({origin:'http://localhost:3000',credentials:true}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.cookie('key2','val2',{
    httpOnly:true,
    sameSite:'none',
    secure:true,
  }).send({state:'ok'})
});