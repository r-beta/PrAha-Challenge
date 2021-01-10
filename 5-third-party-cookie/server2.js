const express = require("express");
const cors = require('cors')
const app = express();
const port = 3001;

app.use(cors({origin:'https://93ba23426cd0.ngrok.io',credentials:true}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.cookie('key2','val2',{
    httpOnly:true,
    // sameSite:'none',
  }).send()
});