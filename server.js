const port = 8080;

const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('public'));

const server = http.Server(app);
server.listen(port, connect => console.log('listening on port ' + port));
