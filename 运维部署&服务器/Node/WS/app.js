const WebSocket = require("ws");

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
  port: 8081,
});

wss.on("connection", function (ws) {
  console.log(`[SERVER] connection....`);

  ws.on("message", function (message) {
    console.log(`[SERVER] Received: ${message}`);

    const rfidList = [
      "F00A04F90823482E4EAC000A",
      "F00A04F90823482E4EAC0009",
      "F00A04F90823482E4EAC0008",
    ];

    const msg = {
      rfIdList: rfidList,
    };

    setTimeout(() => {
      ws.send(JSON.stringify(msg), (err) => {
        if (err) {
          console.log(`[SERVER] error: ${err}`);
        }
      });
    }, 1000);

    setTimeout(() => {
      ws.send(`pong`, (err) => {
        if (err) {
          console.log(`[SERVER] error: ${err}`);
        }
      });
    }, 2000);
  });
});

console.log("ws server started at port 8081...");

// client test:

// let count = 0;

// let ws = new WebSocket('ws://localhost:8081/forward/rfidMsg');

// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });

// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
//     count++;
//     if (count > 3) {
//         ws.send('Goodbye!');
//         ws.close();
//     } else {
//         setTimeout(() => {
//             ws.send(`Hello, I'm Mr No.${count}!`);
//         }, 1000);
//     }
// });
