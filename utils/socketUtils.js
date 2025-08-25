const socketIO = require("socket.io");

function GenerateData() {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "serial": makeID(10),
          "registration": "SD-" + makeID(2),
          "Name": "Dji Mavic",
          "altitude": Math.floor(Math.random() * 100),
          "pilot": "Besher",
          "organization": "Sager Drone",
          "yaw": 120 + Math.floor(Math.random() * 20)
        },
        "geometry": {
          "coordinates": makeLocation(),
          "type": "Point"
        }
      }
    ]
  }
}

function makeID(number) {
  const characters = 'ABCD';
  let result = '';
  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * 4));
  }
  return result;
}

function makeLocation() {
  return [
    35.93131881204147 + (Math.random() * 2 - 1) / 10,
    31.94878648036645 + (Math.random() * 2 - 1) / 10
  ];
}

function sio(server) {
  return socketIO(server, {
    transports: ["polling"],
    cors: { origin: "*" },
  });
}

function connection(io) {
  io.on("connection", (socket) => {
    console.log(`-> Client ${socket.id} connected`);

    const interval = setInterval(() => {
      socket.emit('message', GenerateData());
    }, 1000);

    socket.on("disconnect", () => {
      console.log(`-> Client ${socket.id} disconnected`);
      clearInterval(interval);
    });
  });
}

// Export everything together
module.exports = { sio, connection, GenerateData };
