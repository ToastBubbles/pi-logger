const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON in the request body
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'express' directory
app.use(express.static("express"));
let logs = [];
// Default route for rendering the view
app.get('/', function (req, res) {
    const data = {
        title: 'PiCheckr',
        logs: logs
    };
    res.render('index', data);
});

// Handling the '/api' POST request
app.post('/api', (req, res) => {
    console.log('POST request received for /api');
    console.log('Request body:', req.body);
    if (req.body.value) {
        if (logs.length >= 1000) {
            logs.shift();
        }
        logs.push(req.body.value);
    }

    res.send('POST request received successfully for /api');
});

app.get('/api', (req, res) => {
    const data = {
        logs: logs
    };
    res.json(data);
});

// Handling other routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);