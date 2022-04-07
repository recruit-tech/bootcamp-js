# 開発環境 構築 (1回実行すればよいです)

```bash
$ cd server && npm i
```

# 開発環境の起動

```bash
# terminal 1
$ cd client && bash run.bash

# terminal 2
$ cd server && npm start
```

# TODO管理アプリを開発せよ

あなたは，TODO管理アプリ のフロントエンドの開発を任されました．
他の開発者は，「他の人が後で引き継ぎやすいように view と ロジック を切り分けてほしい」「ブラウザ標準のAPIのみで実装してほしい」と言っていました．
開発を進めるにあたっていま準備できているものは，html, css, 開発用サーバー です．
TODO管理アプリに求められている要件は，次のとおりです．

- API からデータを取得して TODO 一覧を閲覧できるようにする
- TODO を作成できるようにする
- TODO を更新 (done かどうか) できるようにする
- TODO を削除できるようにする

余裕があれば次のこともやってください．

- TODO名を更新できるようにする
- アーキテクチャの工夫点を簡単にまとめる

### Todo model

- id: number
> id は uniq
- name: string
- done: boolean
> todo が 完了したかどうかのステータス, true だと完了

### GET `/todo` todo 一覧取得 API

#### Example

- request body : なし

- response body

```json
{
  "todoList": [
    {
      "id": 1,
      "name": "牛乳を買う",
      "done": false
    },
    {
      "id": 2,
      "name": "部屋を掃除する",
      "done": true
    }
  ]
}
```

### POST `/todo` todo 新規作成 API

#### Example

- request body

```json
{
  "name": "卵を買う"
}
```

- response body

status: 201

```json
{
  "id": 3,
  "name": "卵を買う",
  "done": false
}
```

### PATCH `/todo/:id` todo 更新 API

> MEMO:
> done を true / false に更新するのに活用する
> 余裕があれば todo名 変更機能もこのAPIを活用して実装する

#### Example

- request body

endopoint : `/todo/3`

```json
{
  "name": "卵を買う",
  "done": true
}
```

- response body

status: 201

```json
{
  "id": 3,
  "name": "卵を買う",
  "done": true
}
```

### DELETE `/todo/:id` todo 削除 API

> MEMO:
> このAPIを叩いたあと，一覧を再取得しないと
> フロントエンド側のTODO一覧が更新されない

#### Example

- request body : なし

- response body : なし (204)

