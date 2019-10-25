const ctrl = require("./config/app");

const express = require("express");
const app = express();

const http = require("http").Server(app);
const port = process.env.PORT || ctrl.port;

const io = require("socket.io")(http);
const Programs = require("./app/config/Programs");

var programs = new Programs();

app.use(express.static("./app/public"));

app.get("/", function(req, res) {
  res.sendFile(`${ctrl.absolute_path}/app/public/views/index.html`);
});

io.on("connection", function(socket) {
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
});

http.listen(port, function() {
  console.log(
    `Listening on ${
      ctrl.env == "production" ? ctrl.ip + ":" + port : "localhost:" + port
    }`,
  );
});
