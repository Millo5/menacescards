const express = require('express');
const session = require('express-session');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');
const { Packet } = require('./game/net/packet');
const { GameServer } = require('./game/net/gameServer');
const { GamePacket } = require('./game/net/gamePacket');


class GameServerManager {
    constructor(port = 61660) {
        this.app = express();
        this.port = port;
        this.activeGames = new Map();
        this.server = null;
        this.wss = null;
    }

    start() {
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false, maxAge: 60000 }
        }));

        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`);
        });

        this.wss = new WebSocketServer({ server: this.server });

        this.wss.on('connection', this.handleConnection.bind(this));
    }

    
    newGame() {
        var id = Math.random().toString(36).substring(7);
        while (this.activeGames.has(id)) {
            id = Math.random().toString(36).substring(7);
        }
        this.activeGames.set(id, new GameServer(id));

        return id;
    }

    
    getGame(id) {
        return this.activeGames.get(id);
    }

    
    handleConnection(socket) {
        console.log('A client connected');

        socket.on('message', (message) => {
            const data = JSON.parse(message);
            
            try {
                const packet = Packet.fromJSON(data);
                if (packet instanceof GamePacket) {
                    GamePacket.send(socket, this)
                }
                packet.handle(socket, this);
            } catch (error) {
                console.error('Failed to parse packet', error);
            }
        });

        socket.on('close', () => {
            console.log('A client disconnected');
        });
    }
}

module.exports = { GameServerManager };
