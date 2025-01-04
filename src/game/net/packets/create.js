const { Packet } = require('../packet');

class CreatePacket extends Packet {
    constructor(data) {
        super('create', data);
    }

    handle(socket, server) {
        console.log('User created game');

        const id = server.newGame();
        socket.send(JSON.stringify({ type: 'join_game', data: { id } }));
    }

}

Packet.register('create', CreatePacket);