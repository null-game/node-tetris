// モジュール
const GameManager = require('./GameManager');
const Room = require('./Room');

// 設定
const GameSettings = require('./GameSettings');

/**
 * ゲームクラス
 * ・ゲームマネージャーを保持
 * ・通信処理を有する
 * ・周期的処理を有する
 */
module.exports = class Game {
	// 開始
	start(io) {
		// ゲームマネージャー
		const gameManager = new GameManager(io);
		// 現在時刻を記録
		let lastTime = Date.now();

		// 接続時の処理
		io.on('connection', (socket) => {
			console.log(`connection: socket.id = ${socket.id}`);
			let player = null;
			let room = null;

			// プレイヤー作成
			socket.on('create-player', (e) => {
				console.log(`create-player: socket.id = ${socket.id}`);
				player = gameManager.createPlayer(socket.id, e.playerName);
			});

			// ルーム作成
			socket.on('create-room', (e) => {
				console.log(`create-room: socket.id = ${socket.id}`);
				room = gameManager.createRoom(e.roomName);
			});

			// ルーム入室
			socket.on('join-room', (e) => {
				console.log(`create-room: socket.id = ${socket.id}`);
				room = gameManager.joinRoom(socket.id, e.roomID);
			});

			// 切断時の処理
			socket.on('disconnect', () => {
				console.log(`disconnect: socket.id = ${socket.id}`);
			});
		});

		// 周期的処理
		setInterval(() => {
			// 経過時間の算出
			const currentTime = Date.now(); // ミリ秒単位
			const deltaTime = (currentTime - lastTime) * 0.001; // 秒単位

			// 現在時刻を記録
			lastTime = currentTime;

			const hrtime = process.hrtime(); // ナノ秒単位

			// 更新
			gameManager.update(deltaTime);

			const hrtimeDiff = process.hrtime(hrtime);
			const nanoSecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

		}, 1000 / GameSettings.FRAMERATE);
	}
}