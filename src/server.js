const express = require('express');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const PORT = 61660;

app.use(express.static(path.join(__dirname, '..', 'public')));


const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

const wss = new WebSocketServer({ server });


wss.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('A client disconnected');
    });
});
