const ip = require('ip');
const express = require('express');
const path = require('path');
const http_port = process.env.HTTP_PORT || 4200;
const PORTS = process.env.PORTS ? process.env.PORTS.split(';') : [];


const app = express();

const IP = ip.address();

app.use(express.static(path.join(__dirname, './dist')));
app.get('/hosts', (req, res) => {
  const hosts = PORTS.map(port => `http://${IP}:${port}`);
  res.send(hosts);
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
