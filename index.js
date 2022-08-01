const WebSocket = require('ws');
const express = require('express');
const open = require('open');

const WS_PORT = 7071;
const EXPRESS_PORT = 3001;

const wss = new WebSocket.Server({ port: WS_PORT });
const app = express();

const clients = new Map();

wss.on('connection', (ws) => {
  clients.set(ws);

  ws.on('close', () => {
    clients.delete(ws);
  });
});

console.log('WSS is up on port:', WS_PORT);

app.use(express.static('public'));
app.use(express.json());

app.post('/ws', (req, res) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(req.body));
    }
  });
  console.log(req.body);
  res.send('success');
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Example app listening on port ${EXPRESS_PORT}`);
});

open('http://localhost:3001');
