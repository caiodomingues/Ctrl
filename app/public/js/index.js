$(function() {
  var socket = io();

  $("#emitter-form").submit(function(e) {
    e.preventDefault();

    if ($("#emitter").val() != "") socket.emit("data", $("#emitter").val());

    $("#emitter").val("");
    return false;
  });

  let swt = 0;
  $("#power-btn").click(function() {
    if (swt) {
      $("#emitter").val("self:abort");
      $("#emitter-form").submit();

      $("#power-icon")
        .removeClass("fa-times")
        .addClass("fa-power-off");
      swt = 0;
    } else {
      $("#emitter").val("self:shutdown");
      $("#emitter-form").submit();

      $("#power-icon")
        .removeClass("fa-power-off")
        .addClass("fa-times");
      swt = 1;
    }
  });

  $("#l-clear").click(function() {
    $("#log").html(
      "<li id='h-init' class='list-group-item text-muted'><em class='fa fa-exclamation mr-4'></em> Empty</li>",
    );
  });

  $("#h-clear").click(function() {
    $("#history").html(
      "<li id='h-init' class='list-group-item text-muted'><em class='fa fa-exclamation mr-4'></em> Empty</li>",
    );
  });

  socket.on("history", function(msg) {
    $("#h-init").hide();
    $("#history").append(
      $(`<li class='list-group-item text-muted'>${msg}</li>`),
    );
  });

  socket.on("log", function(msg) {
    $("#l-init").hide();
    $("#log").append(
      $(
        `<li class='list-group-item text-muted'>
        <em class="fa fa-times mr-4"></em> Error executing '<strong>${
          msg[0]
        }</strong>': 
        <br> 
        <em class="fa fa-info mr-4"></em> &nbsp; ${msg[1]}</li>`,
      ),
    );
  });
});
