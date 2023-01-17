const WebSocket = require('ws');
const express = require('express');
const open = require('open');

const WS_PORT = 7071;
const EXPRESS_PORT = 3001;

const wss = new WebSocket.Server({ port: WS_PORT });
const app = express();

wss.on('connection', (ws) => {
  console.log('connection established');

  ws.on('close', () => {
    console.log('client disconnected');
  });

  ws.on('message', (messageAsString) => {
    console.log('message received FROM client: ', JSON.parse(messageAsString));
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
  console.log('message sent to client: ', req.body);
  res.send('success');
});

app.listen(EXPRESS_PORT, () => {
  console.log(`WebSocket app listening on port ${EXPRESS_PORT}`);
});

open('http://localhost:3001');
