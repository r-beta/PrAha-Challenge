## 以下のリクエストをcurlコマンドでhttpbinに送信してください
curlコマンドをペアと比較して、なぜそのような書き方をしたのか、話し合ってみましょう

### 問題１
- カスタムヘッダーを加える（X-Test='hello'）
- methodはGET
- URLはhttps://httpbin.org/headers
以下のようなレスポンスを得られるはずです
```
{
  "headers": {
    "Accept": "*/*", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0", 
    "X-Test": "hello" // ここが重要！
  }
}
```

### <回答>
```
C:\Users\Owner>curl -H  "X-Test: hello" https://httpbin.org/headers
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.55.1",
    "X-Amzn-Trace-Id": "xxxxxxx", // 個人情報だとまずいので伏字
    "X-Test": "hello"
  }
}
```


### 問題２
- Content-Typeは"application/json"
- methodはPOST
- bodyは {"name": "hoge"}
- URLはhttps://httpbin.org/post
以下のようなレスポンスを得られるはずです
```
{
  "data": "{\"name\": \"hoge\"}",  // ここが重要！
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "16", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "json": {
    "name": "hoge" // ここが重要！
  }, 
  "origin": "xxxxxxxxxx",  // 自分自身のIPアドレス
  "url": "https://httpbin.org/post"
}
```




### 問題３
もう少し複雑なbodyを送信してみましょう。以下のようなオブジェクトをbodyに含めて、送信してください
- {userA: {name: "hoge", age: 29}}


### 問題４
「ごめんごめん、このエンドポイント、まだapplication/jsonに対応してないから、Content-Typeはapplication/x-www-form-urlencodedで送ってもらえる？」と先輩に頼まれました
Content-Typeを変更して、リクエストを送信してみましょう
以下のようなレスポンスを得られるはずです

```
{
  "data": "",  // 先ほどはここにname:hogeが含まれていた
  "form": {
    "{\"name\": \"hoge\"}": "" // 今はここに含まれている
  }, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "16", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "json": null,  // 先ほどはここにname:hogeが含まれていた
  "url": "https://httpbin.org/post"
}
```



## postman

- postmanをインストールしてください
- 上記の課題（curlコマンド）と同じ結果を得られるよう、リクエストを全てpostmanで再現してください


## クイズ
### curlに関するクイズを作成してください
### postmanに関するクイズを作成してください
