const express = require('express');
const http = require('http');

const app = express();

app.use(express.static('static'));

const server = http.createServer(app, 3000);

server.listen(3000);
