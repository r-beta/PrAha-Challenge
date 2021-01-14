## 課題 1（質問）

### 以下の単語を使って CORS の仕組みを説明してください

- preflight request
- simple request
- access-control-allow-origin

### <回答>
HTMLが配信されたサーバと異なるオリジンのサーバのリソースへJSからリクエストを送るとき、  
通常は拒否されてしまう（同一オリジンポリシー）  
ただ、サーバ側で`access-control-allow-origin`にリクエスト元のオリジンを指定していると、レスポンスを取得できる

このとき、GET/POSTなどの単純なリクエストの場合は`simple request`と呼ばれ、１往復のやり取りしか発生しないが、  
PUTやDELETEなどのリクエストの場合は、事前に`preflight request`という`OPTIONS`メソッドでのやり取りが行われ、通信が許可されているかを確認する。

### CORS の仕組みが無い場合、どのような不都合が生じるのでしょうか？

### <回答>

APIを自由に使ってもらえるように公開したい場合でもオリジンが違うと利用できなくなる  

### `Access-Control-Allow-Origin: *` この設定が問題となるケースを 1 つ挙げて、なぜ設定するべきではないのか、説明してください

### <回答>

POSTされたデータをDBに格納するような処理  
どこからでもアクセスされて自由にDBに値を追加されてしまうため、一般公開しないリクエストは許可するドメインだけを指定する

### （シンプルなリクエスト）

- preflight request が送信されない「シンプルなリクエスト」に該当するための条件を説明してください

### <回答>

  - 許可されているメソッドであること（GET/HEAD/POST）
  - ユーザーエージェントによって自動設定されたヘッダー以外に、Fetch仕様書で禁止ヘッダーとして定義されているヘッダーが使われておらず、CORSセーフリストリクエストヘッダーに定義されているヘッダーのみが設定されていること
  - `Content-Type`の値が、`application/x-www-form-urlencoded` `multipart/form-data` `text/plain` 以外でないこと
  - リクエストに使用されるどの`XMLHttpRequestUpload`にもイベントリスナーが登録されていないこと
  - リクエストに`ReadableStream`オブジェクトが使用されていないこと

- シンプルなリクエストの場合は preflight リクエストが送信されず、そのままリクエストがサーバに到達します。サーバからのレスポンスの Access-Control-Allow-Origin ヘッダーに、リクエスト送信元のオリジンが含まれない場合、ブラウザはどのような挙動を取るでしょうか？

### <回答>

アクセスすることができない

- XMLHttpRequest を使ってクロスオリジンリクエストを発行する際、デフォルトの挙動だとリクエストにクッキーが含まれません。クッキー情報を含むためには、何をする必要があるでしょうか？

### <回答>

Cookieなどの資格情報つきのリクエストの場合、ワイルドカードを用いると失敗する  
`Access-Control-Allow-Origin`にリクエスト元のオリジンを明記する必要がある

## 課題 2（クイズ）

### CORS に関するクイズを作成してください

### Q1 クライアント側でfetchを使用してcorsを行うために必要なことを答えよ

<details><summary>回答</summary>
  
    第２引数に`{mode:'cors'}`を指定する
    
<details>
  
### Q2 クロスオリジンリソース共有ができない場合に、エラーとはならず空のレスポンスが返却されるようにするにはどうするか

<details><summary>回答</summary>
  
    第２引数に`{mode:'no-cors'}`を指定する
    
<details>
  
### Q3 `access-control-allow-origin`で複数のドメインを許可するにはどうすればよいか

<details><summary>回答</summary>
  
  直接複数指定することはできないので変数で動的に指定する  
  （具体例）  
  ```
  function interceptor(req, res){
  host = req.headers.host;

  if(checkDomain(host)){
    res.setHeader('Access-Control-Allow-Origin','http://'+host);
    res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','*');
  }
}

function checkDomain(host){
  // Something like DB connection...
  if(host == 'hogehoge.com')return true;
  return false;
}
  ```
  リクエストヘッダに含まれるhostを取得し、許可するhostの配列などと付け合わせる  
  マッチしたとき、`access-control-allow-origin`に`"https://" + host`を設定する
  
<details>
  
  [[ 参考 ]](https://developer.mozilla.org/ja/docs/Web/API/Request/mode)

## 課題 3（実装）

### この課題では、CORS を説明するためのモックを作成していただきます

## 仕様

- 特定のオリジンからの POST リクエストのみ許可して、それ以外のオリジンから POST リクエストを受けた時は、CORS 制約によりアクセスが制限されるようなサーバを作成してください
- 「Simple request」の時は preflight が行われないこと
- 「Simple request」に該当しないときは preflight が行われることを証明してください

### 技術的な仕様

- サーバは node.js と express で作成してください（以降の課題でも使うため）

## 課題 4（成果物に関する質問）

- 作成した成果物に、試しに CURL で、「Simple request」に該当しない POST リクエストを送信してみましょう
- 果たして CURL からのリクエストを受けた時、CORS 制約は適用されるでしょうか？
- その理由を説明してください
