## 課題１（実装）

node.js と express で WEB サーバを作ってください  
デプロイする必要はありません。ローカル環境で起動して、サーバに対して curl コマンドでリクエストを送信して、動作確認してみましょう

WEB サーバの仕様

- エンドポイントは 2 つ（仮に localhost:8080 で起動していると仮定した場合）
- localhost:8080 に対して GET リクエスト受けた時、{text: hello world}と json を HTTP ステータス 200 で返してください
- localhost:8080 に対して POST リクエストを受けた時、リクエスト body に含まれる json データを、レスポンスの body に含めて、HTTP ステータス 201 で返してください
- POST リクエストを受け付けるエンドポイントは、Content-Type が application/json 以外の時は、HTTP ステータス 400 を返してください
- 上記のサーバが完成したら、以下のようなコマンドを実行して、仕様が満たされていることを確認してください

```
curl localhost:8080 -H "Content-Type: application/json"
// {text: hello world}が返ってくるはず

curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
// {name: hoge}が返ってくるはず

curl localhost:8080 -d '{"name": "hoge"}'
// HTTPステータス400、エラーが発生するはず
```

### `node index`で 3000 ポートに上記の要件を満たしたサーバが立ち上がる

## 課題２（質問）

Content-type に application/x-www-form-urlencoded を指定した時と、application/json を指定した時で、送信されるデータ形式がどのように異なるのか説明してください。どんな時にどちらを選択するべきでしょうか？

- `application/json` の場合

`request.body` は `{ name: 'hoge' }`

- `application/x-www-form-urlencoded` の場合

`request.body` は `{ '{"name": "hoge"}': '' }` になっていた？

`application/json` の場合は`json`データを送っているが、`urlencoded`の場合は URL パラメータをエンコードするようにサーバに通知しているらしい

[[参考]](https://qastack.jp/programming/9870523/differences-in-application-json-and-application-x-www-form-urlencoded)

クエリストリングの場合は`urlencoded`を指定し、アプリケーションから POST などでデータを送るときは`application/json`にする
