const webSocketServer = require("websocket").server;
const http = require("http");
const { waitForDebugger } = require("inspector");
const { connected } = require("process");
const webSocketServerPort = 8000;

// creare Server
const server = http.createServer();
//now Server should listen to this port-> webSocketServerPort
server.listen(webSocketServerPort);
console.info("Listening on port 8000.... :)");

// our WebSocket initializing. webSocketServer() is from "websocket" pckg.
// webSocketServer receives an object of options, in that obj we can include HTTP Server that
// we want this WS to work on.
const wsServer = new webSocketServer({
  httpServer: server,
});

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

wsServer.on("request", function (request) {
  var id = generateID();
  console.log("Connection request from " + request.origin + ".");

  const connection = request.accept(null, request.origin);
  connectedUsers[id] = connection;
  console.log(
    "Connection established: " +
      id +
      " in " +
      Object.getOwnPropertyNames(connectedUsers)
  );

  connection.on("message", function (message) {
    console.log("Received message: ", message.utf8Data);

    for (id in connectedUsers) {
      connectedUsers[id].sendUTF(message.utf8Data);
      console.log("Sent message to: ", connectedUsers[id]);
    }
  });
});
