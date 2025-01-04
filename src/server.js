const fs = require("fs");
const path = require("path");
const { GameServerManager } = require("./gameServerManager");


console.log("Loading packets");
const packetDir = path.join(__dirname, "game", "net", "packets");
const read = (dir) => fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...read(name)] : [...files, name];
}, []);
const files = read(packetDir);
files.forEach(file => {
    require(file);
});


console.log("Starting server");
const gameServer = new GameServerManager();
gameServer.start();
