'use strict'; // 厳格モード

// モジュール
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Game = require('./libs/Game.js');

// オブジェクト
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 3000;

// ゲーム作成・開始
const game = new Game();
game.start(io);

// 公開フォルダ指定
app.use(express.static(`${__dirname}/public`));

// サーバー起動
server.listen(PORT, () => {
	console.log(`Starting server on port ${PORT}`);
});