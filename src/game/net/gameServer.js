class GameServer {
    
    constructor() {
        this.players = [];
        this.host = null;
    }

    addPlayer(player) {
        if (this.players.length === 0) {
            this.host = player;
        }
        this.players.push(player);
    }

    removePlayer(player) {
        if (this.host.id === player.id) {
            this.host = this.players[0];
        }
        this.players = this.players.filter(p => p.id !== player.id);
    }

    getPlayers() {
        return this.players;
    }

    getHost() {
        return this.host;
    }

    isHost(player) {
        return this.host.id === player.id;
    }

}

module.exports = { GameServer };
