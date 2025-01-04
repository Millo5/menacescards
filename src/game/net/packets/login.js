const { Packet } = require('../packet');

class LoginPacket extends Packet {
    constructor(data) {
        super('login', data);
    }

    handle(socket, server) {
        console.log('User logged in', this.data.username, socket._socket.remoteAddress);

        socket.send(JSON.stringify({ type: 'gamelist', data: { 
            games: Array.from(server.activeGames.keys())
         } }));
    }

}

Packet.register('login', LoginPacket);