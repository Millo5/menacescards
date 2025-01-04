function connect() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    const button = document.getElementById('connectButton');
    const username = document.getElementById('username').value;

    if (message && username) {
        button.disabled = true;

        const ws = new WebSocket('ws://' + message + ':61660');
        ws.onopen = () => {
            console.log('Connected');
            document.getElementById("connectionPage").remove();

            // Tell the server who we are
            ws.send({ type: 'login', data: {
                username: username,
            }});
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
