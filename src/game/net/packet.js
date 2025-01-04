
// abstract
class Packet {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    handle(socket) {
        throw new Error('Method not implemented');
    }

    static register(type, packet) {
        
        if (!Packet.registry) {
            Packet.registry = {};
        }

        Packet.registry[type] = packet;
    }

    static fromJSON(json) {
        const packet = Packet.registry[json.type];
        if (!packet) {
            throw new Error('Unknown packet type: ' + json.type);
        }
        return new packet(json.data);
    }
}

module.exports = { Packet };
