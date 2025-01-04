const { Packet } = require('./packet');

// abstract
class GamePacket extends Packet {
    handle(socket, gameServer) {
        throw new Error('Method not implemented');
    }

    static send(socket, serverManager) {
        
    }
}

module.exports = { GamePacket };