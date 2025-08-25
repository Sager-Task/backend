// socket/index.js
const socketIO = require("socket.io");
const { GenerateData } = require("../utils/socketUtils");

let io;

function init(server) {
  io = socketIO(server, {
    transports: ["polling"],
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`-> Client ${socket.id} connected`);

    const interval = setInterval(() => {
      socket.emit("message", GenerateData());
    }, 1000);

    socket.on("disconnect", () => {
      console.log(`-> Client ${socket.id} disconnected`);
      clearInterval(interval);
    });
  });

  return io;
}

module.exports = { init, io };
