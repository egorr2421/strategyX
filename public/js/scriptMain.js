$(document).ready(function () {
  function getOnline() {
    jQuery
      .get("/online_users", {}, function (data) {
        $(".main_table_body").empty();
        var number = 0;
        for (var key in data) {
          var tr = $("<tr>", { class: "user" });
          tr.data("userLogin", data[key].login);
          number++;
          tr.append($("<th>", { scope: "row" }).text(number));
          tr.append($("<td>").text(data[key].login));
          tr.append($("<td>").text(data[key].email));
          $(".main_table_body").append(tr);
        }
        $(".user").click(function () {
          socket.emit("choose", {
            target: $(this).data("userLogin"),
            req: jQuery.cookie("session_id"),
          });
        });
      })
      .fail(function () {
        console.log("error get lang details");
      });
  }
  getOnline();
  setInterval(getOnline, 10000);

  ///socket
  var socket = io.connect("http://192.168.0.104:3000");

  socket.on("message", function (data) {
    console.log(data);
  });
  socket.on("somedata", function (data) {
    console.log(data);
  });
  socket.on("find", function (data) {
    if (
      data.target.sessionId == jQuery.cookie("session_id") &&
      data.req.sessionId != jQuery.cookie("session_id")
    ) {
      swal({
        title: "Would you like to fight with " + data.req.login + "?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          socket.emit("readyToFight", data);
        } else {
        }
      });
    } //bug
    console.log(data);
  });

  socket.on("toFight", function (data) {
    if (
      data.userFirst.sessionId == jQuery.cookie("session_id") ||
      data.userSecond.sessionId == jQuery.cookie("session_id")
    ) {
      console.log(data);
      $.redirect("/fight", { battle: JSON.stringify(data) }, "POST");
    }
  });
});
