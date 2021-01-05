## 課題１（実装）

node.jsとexpressでWEBサーバを作ってください  
デプロイする必要はありません。ローカル環境で起動して、サーバに対してcurlコマンドでリクエストを送信して、動作確認してみましょう  

WEBサーバの仕様

- エンドポイントは2つ（仮にlocalhost:8080で起動していると仮定した場合）
- localhost:8080に対してGETリクエスト受けた時、{text: hello world}とjsonをHTTPステータス200で返してください
- localhost:8080に対してPOSTリクエストを受けた時、リクエストbodyに含まれるjsonデータを、レスポンスのbodyに含めて、HTTPステータス201で返してください
- POSTリクエストを受け付けるエンドポイントは、Content-Typeがapplication/json以外の時は、HTTPステータス400を返してください
- 上記のサーバが完成したら、以下のようなコマンドを実行して、仕様が満たされていることを確認してください


```
curl localhost:8080 -H "Content-Type: application/json"
// {text: hello world}が返ってくるはず

curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
// {name: hoge}が返ってくるはず

curl localhost:8080 -d '{"name": "hoge"}'
// HTTPステータス400、エラーが発生するはず
```


### ヒント：

application/json形式のリクエストbodyをexpressで利用するには、express.json()　などのparserを使う必要があります  
expressのrequest.bodyの中身はデフォルトだと実態が「ストリーム」のため、parserを設定する事なく「request.body」にアクセスすると、undefinedが返ります  
ストリームまとめて、stringなど普段使い慣れた型として使うためにexpress.json()を使って変換します  
（そもそもなぜrequest.bodyの内部はストリームなのでしょうか？ペアと話し合ってみてください）  


## 課題２（質問）

Content-typeにapplication/x-www-form-urlencodedを指定した時と、application/jsonを指定した時で、送信されるデータ形式がどのように異なるのか説明してください。どんな時にどちらを選択するべきでしょうか？
