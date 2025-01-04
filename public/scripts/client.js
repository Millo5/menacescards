var _ws = null;
function connect() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    const button = document.getElementById('connectButton');
    const username = document.getElementById('username').value;

    if (message && username) {
        button.disabled = true;

        const ws = new WebSocket('ws://' + message + ':61660');
        _ws = ws;
        ws.onopen = () => {
            console.log('Connected');
            document.getElementById("connectionPage").remove();
            document.getElementById("gamesPage").style.display = "block";

            // Update the cookie
            localStorage.setItem('ip', message);
            localStorage.setItem('username', username);

            // Tell the server who we are
            const data = { type: 'login', data: {
                username: username,
            }};
            ws.send(JSON.stringify(data));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received', data);

            if (data.type === 'gamelist') {
                const games = data.data.games;
                const gameList = document.getElementById('gameList');
                gameList.innerHTML = '';
                games.forEach(game => {
                    const li = document.createElement('li');
                    li.textContent = game;
                    gameList.appendChild(li);
                });
            }

            if (data.type === 'join_game') {
                const id = data.data.id;
                window.location.href = '/game.html?id=' + id;
            }
        };


        ws.onerror = (event) => {
            console.error('Failed to connect', event);
            document.getElementById("errorMessage").style.display = "block";
            button.disabled = false;
        };

        ws.onclose = (event) => {
            if (event.wasClean) {
                console.log('Connection closed cleanly', event);
            } else {
                console.error('Connection died', event);
                document.getElementById("errorMessage").style.display = "block";
            }
            button.disabled = false;
        };
    }
}

function createNewGame() {
    const ws = _ws;
    const data = { type: 'create', data: {}};
    ws.send(JSON.stringify(data));
}

function loadCookie() {
    const ip = localStorage.getItem('ip');
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').value = username;
    }
    if (ip) {
        document.getElementById('message').value = ip;
    }
}


loadCookie();