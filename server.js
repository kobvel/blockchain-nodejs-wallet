const express = require('express');
const path = require('path');
const http_port = process.env.HTTP_PORT || 4200;
const PORTS = process.env.PORTS ? process.env.PORTS.split(';') : [];
const HOST = process.env.HOST || 'HOST';


const trimHost = HOST.match(/\/\/(.*):/);
const hostname = trimHost.length > 0 ? trimHost[0] : '';
const app = express();


app.use(express.static(path.join(__dirname, './dist')));
app.get('/hosts', (req, res) => {
  const hosts = PORTS.map(port => `http:${hostname}${port}`);
  res.send(hosts);
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
