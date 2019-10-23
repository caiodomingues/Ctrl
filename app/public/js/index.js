$(function() {
  var socket = io();

  $("#emitter-form").submit(function(e) {
    e.preventDefault();

    if ($("#emitter").val() != "") socket.emit("data", $("#emitter").val());

    $("#emitter").val("");
    return false;
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
        `<li class='list-group-item text-muted'><em class="fa fa-times mr-4"></em> Error executing '<strong>${msg}</strong>'</li>`,
      ),
    );
  });
});
