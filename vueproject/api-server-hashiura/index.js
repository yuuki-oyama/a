const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// エラーログ出力
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

// エラーハンドリング。対象のエラーを返す
function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500);
  next(err);
}

// ミドルウェアの定義。すべてのミドルウェアよりも後に定義する必要がある。
app.use(logErrors);
app.use(errorHandler);

/**mySQLに接続
 *host,user,password,databaseを各自編集
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hibariqazxsw',
  database: 'hibari-test',
});

//サーバー外からのアクセスを許可する　CORS対策設定
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); //第2引数に呼び出し元のURLヘッダを記載する。(htpps://localhost8080など)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/**
 * 一覧取得
 * 指定したテーブルから、一覧表を取得する。
 * 任意のテーブル名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.get('/todoList', function (req, res, next) {
  connection.query('SELECT * FROM todo_list', function (error, results) {
    if (error) {
      // ミドルウェアにエラー内容を渡す。
      next(error);
    } else {
      res.send(results);
    }
  });
});

/**
 * 新規登録
 * 指定したテーブルに、新規データを登録する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/todoList/add', function (req, res, next) {
  connection.query(
    'INSERT INTO todo_list (todo_title, todo_detail, todo_priority) VALUES (?,?,?)',
    [req.body.todoTitle,
     req.body.todoDetail,
     req.body.todoPriority],
    function (error, results) {
      if (error) {
        // ミドルウェアにエラー内容を渡す。
        next(error);
      } else {
        res.send(results);
      }
    }
  );
});

/**
 * 編集
 * 指定したテーブルの指定したデータを編集する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/todoList/edit', function (req, res, next) {
  connection.query(
    'UPDATE todo_list SET todo_title = ? WHERE id = ?',
    [
      req.body.todoTitle,
      req.body.todoId,
    ],
    function (error, results) {
      if (error) {
        // ミドルウェアにエラー内容を渡す。
        next(error);
      } else {
        res.send(results);
      }
    }
  );
});

/**
 * 削除
 * 指定したテーブルの指定したデータを削除する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 * @param next エラー処理をミドルウェアに渡す関数
 */
app.post('/todoList/delete', function (req, res, next) {
  connection.query(
    'DELETE FROM todo_list WHERE id IN(?)',
    [req.body.todoDeleteList],
    function (error, results) {
      if (error) {
        // ミドルウェアにエラー内容を渡す。
        next(error);
      } else {
        res.send(results);
      }
    }
  );
});

// ポート4000で繋げるようにする処理。
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
