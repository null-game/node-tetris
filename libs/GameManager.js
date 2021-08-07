// モジュール
const Room = require('./Room');
const Player = require('./Player');

/**
 * ゲームマネージャークラス（ゲームに保持される）
 * ・ゲーム内の各種要素を保持
 * ・ゲームワールドの更新処理を有する
 * ・ゲーム内の各種要素の生成/破棄処理を有する
 * ・ルーム入室/退室処理を有する
 */
module.exports = class GameManager {
	constructor(io) {
		this.io = io;
		this.roomSet = new Set();
		this.playerSet = new Set();
	}

	// 更新
	update(deltaTime) {
		this.updateObjects(deltaTime);
	}

	// オブジェクトの更新
	updateObjects(deltaTime) {
		this.playerSet.forEach((player) => {
			player.update(deltaTime);
		});
	}

	// プレイヤー生成
	createPlayer(socketID, playerName) {
		const player = new Player(socketID, playerName);
		this.playerSet.add(player);
		return player;
	}

	// プレイヤー破棄
	destroyPlayer(player) {
		this.playerSet.delete(player);
	}

	// ルーム生成
	createRoom(roomName) {
		const room = new Room(roomName);
		this.roomSet.add(room);
		return room;
	}

	// ルーム破棄
	destroyRoom(room) {
		this.roomSet.delete(room);
	}

	// ルーム入室
	joinRoom(socketID, roomID) {
		this.roomSet.forEach((room) => {
			if (roomID === room.id) {
				room.join(socketID);
			}
		});
	}

	// ルーム退室
}