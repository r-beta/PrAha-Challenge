const express = require('express');
// const fs = require('fs');

const noCache = express()
noCache.listen(3000, () => {
  console.log(`no-cache server run on http://localhost:3000`);
});
noCache.get('/',(req,res)=>{
  // fsでファイルを読み込んでから返そうと試行錯誤したあと
  // ※ res.endなら送れたが、res.sendではやはり返らない
  // const image = fs.readFileSync('./images/cat.jpg')
  // console.log(image)
  // res.contentType('jpeg')
  // res.writeHead(200,{'Content-Type':'image/jpg'})
  // res.send(image,'binary')
  res.append('Cache-Control','no-cache')
  res.sendFile(__dirname + '/images/cat.jpg')
})


const withCache = express()
withCache.listen(3001,()=>{
  console.log(`with-cache server run on http://localhost:3001`);
})
withCache.get('/',(req,res)=>{
  res.append('Cache-Control','max-age=86400') // 86400 as 1day
  res.sendFile(__dirname+'/images/cat.jpg')
})