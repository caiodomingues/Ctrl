const ctrl = require("./config/app");

const express = require("express");
const app = express();

const http = require("http").Server(app);
const port = process.env.PORT || ctrl.port;

const io = require("socket.io")(http);
const robot = require("robotjs");

const Programs = require("./app/config/Programs");

var programs = new Programs();

app.use(express.static("./app/public"));

app.get("/", function(req, res) {
  res.sendFile(`${ctrl.absolute_path}/app/public/views/index.html`);
});

io.on("connection", function(socket) {
  let img = robot.screen.capture();
  let buffer = Buffer.from(img.image);
  let base64 = buffer.toString("base64");

  io.emit("startup", {
    w: ctrl.screen_width,
    h: ctrl.screen_height,
    i: base64
  });

  socket.on("data", function(msg) {
    io.emit("history", msg);

    var command = msg.substring(0, msg.indexOf(":"));
    let parameter = msg.substring(msg.indexOf(":") + 1, msg.length);

    try {
      programs.boot(command, parameter);
    } catch (Error) {
      io.emit("log", [msg, Error.toString()]);
    }
  });

  socket.on("mouseClick", function(msg) {
    var screen = {
      posX: msg.x * 2,
      posY: msg.y * 2
    };

    robot.moveMouse(screen.posX, screen.posY);
    robot.mouseClick();
  });
});

http.listen(port, function() {
  console.log(
    `Listening on ${
      ctrl.env == "production" ? ctrl.ip + ":" + port : "localhost:" + port
    }`
  );
});
