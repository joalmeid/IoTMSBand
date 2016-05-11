var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 33338 });

console.log("Waiting...");

wss.on('connection', function connection(ws) {
    console.log('connection');

    ws.on('message', function incoming(message) {
        //console.log('[%s] Received: %s', wss.clients.length, message);
        wss.clients.forEach(function each(client) {
            client.send(message);
        });
    });

    //ws.send('something');
});