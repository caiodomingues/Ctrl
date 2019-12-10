$(function() {
  var socket = io();
  $("#countdown")
    .parent()
    .hide();

  var prevCommands = [];
  var prevCtrl = prevCommands.length;

  $(document).keydown(function(e) {
    switch (e.which) {
      case 38:
        prevCtrl >= 1
          ? $("#emitter").val(prevCommands[prevCtrl-- - 1])
          : (prevCtrl = 1);
        break;
      case 40:
        prevCtrl <= prevCommands.length
          ? $("#emitter").val(prevCommands[prevCtrl++ + 1])
          : (prevCtrl = prevCommands.length - 1);
        break;
      default:
        return;
    }
    e.preventDefault();
  });

  $("#emitter-form").submit(function(e) {
    e.preventDefault();

    if ($("#emitter").val() != "") socket.emit("data", $("#emitter").val());
    prevCommands.push($("#emitter").val());
    prevCtrl = prevCommands.length;

    $("#emitter").val("");
    return false;
  });

  $("#keyboard-form").submit(function(e) {
    e.preventDefault();

    if ($("#keyboard").val() != "")
      socket.emit("keyboard", $("#keyboard").val());

    $("#keyboard").val("");
    return false;
  });

  $("#enter").click(function(){
    e.preventDefault();
    socket.emit("keyboard", "enter");
  });

  let swt = 0;
  $("#power-btn").click(function() {
    if (swt) {
      $("#emitter").val("self:abort");
      $("#emitter-form").submit();

      $("#countdown")
        .parent()
        .hide();

      $("#power-text").text("Shutdown");
      $("#power-icon")
        .removeClass("fa-times")
        .addClass("fa-power-off");
      swt = 0;
    } else {
      $("#emitter").val("self:shutdown");
      $("#emitter-form").submit();

      timer(60, $("#countdown"));
      $("#countdown")
        .parent()
        .show();

      $("#power-text").text("Abort");
      $("#power-icon")
        .removeClass("fa-power-off")
        .addClass("fa-times");
      swt = 1;
    }
  });

  let aux = 0;
  $("#reboot-btn").click(function() {
    if (aux) {
      $("#emitter").val("self:abort");
      $("#emitter-form").submit();

      $("#countdown")
        .parent()
        .hide();

      $("#reboot-text").text("Restart");
      $("#reboot-icon")
        .removeClass("fa-times")
        .addClass("fa-redo");
      aux = 0;
    } else {
      $("#emitter").val("self:restart");
      $("#emitter-form").submit();

      timer(60, $("#countdown"));
      $("#countdown")
        .parent()
        .show();

      $("#reboot-text").text("Abort");
      $("#reboot-icon")
        .removeClass("fa-redo")
        .addClass("fa-times");
      aux = 1;
    }
  });

  $("#l-clear").click(function() {
    $("#log").html(
      "<li id='h-init' class='list-group-item text-muted'><em class='fa fa-exclamation mr-4'></em> Empty</li>"
    );
  });

  $("#h-clear").click(function() {
    $("#history").html(
      "<li id='h-init' class='list-group-item text-muted'><em class='fa fa-exclamation mr-4'></em> Empty</li>"
    );
  });

  socket.on("history", function(msg) {
    $("#h-init").hide();
    $("#history").append(
      $(`<li class='list-group-item text-muted'>${msg}</li>`)
    );
  });

  socket.on("log", function(msg) {
    $("#l-init").hide();
    $("#log").append(
      $(
        `<li class='list-group-item text-muted'>
        <em class="fa fa-times mr-4"></em> Error executing '<strong>${msg[0]}</strong>': 
        <br> 
        <em class="fa fa-info mr-4"></em> &nbsp; ${msg[1]}</li>`
      )
    );
  });

  socket.on("startup", function(msg) {
      $('#mmd').attr('src',)
    let screen = $("#screen");
    screen.width(msg.w / 2).height(msg.h / 2);

    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    var img = new Image();
      img.onload = function () {
        canvas.height = canvas.width * (img.height / img.width);

        // step 1 - resize to 50%
        var oc = document.createElement('canvas'),
            octx = oc.getContext('2d');

        oc.width = img.width * 0.5;
        oc.height = img.height * 0.5;
        octx.drawImage(img, 0, 0, oc.width, oc.height);

        // step 2
        octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

        // step 3, resize to final size
        ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
        0, 0, canvas.width, canvas.height);
    }
    img.src = `data:image/png;base64,${msg.i}`;
    //context.fillStyle = "grey";
    //context.fillRect(0, 0, screen.width(), screen.height());
    //context.drawImage(image, screen.width(), screen.height());
    

    screen.click(function(event) {
      var mousePos = getMousePos(event);
      socket.emit("mouseClick", mousePos);
    });

    screen.mousemove(function(event) {
      var mousePos = getMousePos(event);
      socket.emit("mouseMove", mousePos);
    });
  });

  function getMousePos(evt) {
    var rect = document.getElementById("screen").getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function timer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(`${seconds}s`);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
});
