const express = require('express');
const app = express();
const PORT = 61660;

app.get('/', (req, res) => {
    console.log('Request received from: ', req.ip);
    res.send(`
        <html>
            <head>
                <title>My first express app</title>
            </head>
            <body>
                <h1>Hello World!</h1>
            </body>
        </html>
        `)
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

