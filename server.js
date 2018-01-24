const express = require('express');
const path = require('path');
const http_port = process.env.HTTP_PORT || 8080;
const PORTS = process.env.PORTS ? process.env.PORTS.split(';') : [];
const HOST = process.env.HOST || 'HOST';

const app = express();

const trimHost = HOST.match(/\/\/(.*):/);
let hostname = '';

if (trimHost && trimHost.length > 0) {
  hostname = trimHost[0];
}


app.use(express.static(path.join(__dirname, './dist')));
app.get('/hosts', (req, res) => {
  let hosts = PORTS.map(port => `http:${hostname}${port}`);

  if (!hosts.length) {
    res.send(500);
  }

  res.send(JSON.stringify(hosts));
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
