# 開発環境 構築 (1回実行すればよいです)

```bash
$ cd serevr && npm i
```

# 開発環境の起動

```bash
# terminal 1
$ cd client && bash run.bash

# terminal 2
$ cd server && npm start
```

# 開発途中のTODO管理アプリを完成せよ

あなたは，TODO管理アプリ のフロントエンド部分の開発を任されました．
開発チームのある人は，後でジョインする人がわかりやすいように「なるべく View と ロジックは切り離してほしい」と言っていました．
また，「ブラウザ標準のAPI以外は活用しないでほしい」とのことです．
今手元にあるのは，開発用のサーバーとHTML, CSSです
これらを活用して 以下のことができるアプリケーションを開発してください

- APIから取得した TODO を一覧を閲覧できるようにする
- TODO を作成できるようする
- TODO を更新 (done かどうか) できるようする
- TODO を削除できるようする

余力があれば次のタスクにも着手してほしい

- TODO 名を変更できるようにする
- アーキテクチャの工夫点を簡単にまとめる

## 開発用API サーバーの仕様

開発用 API サーバーは 3000 番 ポートで起動する

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
  "name": "卵を買う"
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
  "name": "卵を買う"
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

