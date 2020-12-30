# 課題１（質問）

### 以下のヘッダーの意味と、役割を説明してください

- ### Host

リクエストが送信される先のホスト名とポート番号が指定される

> Host ヘッダー項目はすべての HTTP/1.1 リクエストメッセージで送信する必要があります。 HTTP/1.1 リクエストメッセージに Host ヘッダー項目がなかったり、二つ以上あったりした場合は 400 (Bad Request) ステータスコードが返されることがあります。


すべてのリクエストに含まれると記述があったため、試しに、chromeデベロッパーツールで確認してみたが、Hostというプロパティは確認できなかった。  
curlに--verbose オプションをつけることで確認することができた  
```
# curl --verbose https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Host
```

- ### Content-type

Response Headerに含まれる  
そのHTTPレスポンスがどういった形式かを表すもの  
たとえば、HTMLを返す通信の場合、`content-type: text/html; charset=utf-8`と書かれていた  
例：https://developer.mozilla.org/ja/docs/Glossary/Request_header

png画像を返す場合、`image/png`
例：https://developer.mozilla.org/favicon-32x32.png

jsonを返す場合、`application/json`
例：https://developer.mozilla.org/manifest.json

このcontent-typeを元にブラウザは画面を組み立てている


- ### User-agent

リクエストヘッダーに含まれる  
どのブラウザからのリクエストかを記述している  
試しにchromeからのリクエストを確認してみた  
`user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36`
chromeの場合、互換性のためにSafariやMozillaなどの文字が含まれているらしい  
これを取り出し、正規表現などで検証すればブラウザごとにレスポンスを変えるような動きが可能になりそう  
例えばIEの場合だと、下記３つが含まれている  
```
; MSIE xyz;
Trident/7.0;
 .*rv:xyz
 ```
ただし、確実ではないため、過信は禁物で、ブラウザごとに挙動を分ける必要が本当にあるのか、もっと他に良い方法がないかを探すことが推奨されている様子。


- ### Accept

ブラウザが受け取ることのできるMIMEタイプをサーバに伝えるため、requestに含めて送信する、サーバ側はこれを確認して適切なcontent-typeを返している  
MIMEタイプはカンマ区切りで並べることができ、クオリティファクターに値をセットして優先度を指定する  
ひとつのURLに対し、AcceptやUser-Agentなどで返却される値が違う（切り替わる）仕組みをサーバー駆動型コンテントネゴシエーションと呼ぶ  

- ### Referer

リクエストヘッダーに含まれる  
ページからページへ遷移した際に、元のページのアドレスを格納する  
例えば、google検索で、ページをクリックした場合は、refererには`https://www.google.com/`という値が入っている  
これを用いて、どのサイトからアクセスしてきたかを解析することができる  

- ### Accept-Encoding

リクエストヘッダーに含まれる  
HTTPの通信は速度を上げるため、基本的にデータを圧縮してやり取りをしている  
ブラウザがどの圧縮アルゴリズムを利用することができるかを送信する  
試しにchromeで送ったリクエストの中身を見てみたところ３つ指定してあった  
`accept-encoding: gzip, deflate, br`

- ### Authorization

リクエストヘッダーに含まれる  
ログインしていないと閲覧できないページなどを実装する際に、ユーザの認証に使われる  
最も基本的な認証方法はBasic認証で、「ユーザ名：パスワード」をBase64へ変換したものをつけて送る  
ただし、逆エンコードすることでユーザ名とパスワードが知られてしまうため、盗聴された場合のリスクが大きい（HTTPSを必ず併用する）  
現在は、Bearerでtokenを用いての認証方法が主流

- ### Location

`Location`はレスポンスヘッダに含まれる。リダイレクトは、サーバからリダイレクトレスポンスを送ることで、発生する  
ブラウザがリダイレクトレスポンスを受け取ったら、`Location`で提供されたURLを使用してすぐにリクエストを送り返す  

### refererについて

- aタグにtarget="_blank"を設定したところ、先輩エンジニアから「ちゃんとrel=noreferrerを設定した？」と聞かれました。なぜそのような設定が必要なのでしょうか？  rel=noreferrerを設定しなかった場合に起きうる問題を調べて、説明して下さい

### <回答>
リンク先のHPにrefererが渡ってしまい、リンク先のサイトでrefererを解析していた際、リンク元のHPのURLなどが知られてしまう。  
例えば、リンクを知っていれば開けてしまうページ（youtubeのURL限定配信）や、URLにユーザ名などの情報を含んでいるページはrefererが流出することでセキュリティのリスクになる。 

- 先輩エンジニアに「同じオリジンの時はrefererの情報を全部送って、別オリジンの時は、オリジン情報だけをrefererとして送信するように、HTTPリクエストにヘッダを追加しておいてもらえる？」と頼まれました。HTTPリクエストのヘッダーには、どんな値を追加する必要があるでしょうか？  

### <回答>
`Referrer-Policy: origin-when-cross-origin` を指定する  
もしくは、ページ全体のリンクに同様の設定をする場合、`<meta name="referrer" content="origin-when-cross-origin">`　を記述する

# 課題２（クイズ）

### HTTPヘッダーに関するクイズを3問、作成してください

