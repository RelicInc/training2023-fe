## 環境構築

1. 以下のコマンドを順に実行してください

```bash
docker-compose up -d
npm install
docker-compose exec app npx prisma migrate dev
docker-compose exec app npm run dev
```

2. http://localhost:3000 にアクセスしてください

※特にサーバーサイド・DB まわりのコマンドは docker 上で実行しないと正しく動作しないので注意してください

## API の動作テスト用 curl コマンド

### GET 系

ブラウザで URL を叩いてください

- 全件取得: http://localhost:3000/api/todo
- 一件取得: http://localhost:3000/api/todo/1

### GET 以外

terminal から curl コマンドを叩いてください。
data の中身や URL の id 部分を変えることでリクエストの内容を変更できます

```bash
# CREATE
curl -XPOST -H "Content-type: application/json" -d '{"value": "POST TEST"}' 'http://localhost:3000/api/todo'

 # UPDATE
curl -XPUT -H "Content-type: application/json" -d '{"value": "UPDATE TEST", "status": "DONE"}' 'http://localhost:3000/api/todo/1'

 # DELETE
curl -XDELETE 'http://localhost:3000/api/todo/1'
```

## DB を GUI で確認・CRUD 操作したい時

terminal で以下コマンドを実行し、 http://localhost:5555 にアクセスしてください

```bash
docker-compose exec app npx prisma studio
```
