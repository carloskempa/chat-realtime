const Koa = require("Koa");
const http = require("http");
const socket = require("socket.io");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

io.on("connection", (socket) => {
  console.log("[IO] Connection => Server Conectado com Sucesso!");

  socket.on("chat.message", (data) => {
    console.log("[SOCKET] Chat.message => ", data);
    io.emit("chat.message", data);
  });
  
  socket.on("disconnect", () => {
    console.log("SOCKET disconnect");
  });
});

server.listen(3005);
