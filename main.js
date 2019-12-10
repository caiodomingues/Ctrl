const ctrl = require("./config/app");
var Jimp = require("jimp");

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
  setInterval(function() {
    io.emit("screen", getScreen());
  }, ctrl.screen_refresh_rate);

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

  socket.on("keyboard", function(msg) {
    switch (msg) {
      case "enter":
        robot.keyTap("enter");
        break;
      default:
        robot.typeString(msg);
    }
  });

  socket.on("mouseMove", function(msg) {
    robot.moveMouse(msg.x * 2, msg.y * 2);
  });

  socket.on("mouseClick", function(msg) {
    robot.mouseClick();
  });
});

function getScreen() {
  let picture = robot.screen.capture();
  var image = new Jimp(picture.width, picture.height, function(err, img) {
    img.bitmap.data = picture.image;
    img.getBuffer(Jimp.MIME_PNG, (err, png) => {
      let base64 = new Buffer(png).toString("base64");
      io.emit("startup", {
        w: ctrl.screen_width,
        h: ctrl.screen_height,
        i: base64
      });
    });
  });
}

http.listen(port, function() {
  console.log(
    `Listening on ${
      ctrl.env == "production" ? ctrl.ip + ":" + port : "localhost:" + port
    }`
  );
});
