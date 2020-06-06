$(document).ready(function () {
  let canvas = document.getElementById("canvas");
  let target = "dwarf";
  let kingApp = true;
  let cnx = canvas.getContext("2d");
  let mas = [];
  let current = 1;
  let prise = 7;
  let acces = false;
  let player = "";
  var nextButton = document.getElementById("button-start");
  let point = {
    y: 0,
    x: 0,
  };
  let w = 13,
    h = 13;

  canvas.onclick = function () {
    beforeStart(event, current);
  };

  function beforeStart(event, unt) {
    //init
    if (
      JSON.parse(jQuery.cookie("battle")).userFirst.sessionId ==
      jQuery.cookie("session_id")
    )
      player = "player1";
    if (
      JSON.parse(jQuery.cookie("battle")).userSecond.sessionId ==
      jQuery.cookie("session_id")
    )
      player = "player2";
    //init
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x + " " + y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    console.log(x + " " + y);
    let temp = document.getElementById("resulte");
    let temp1 = document.getElementById("count-" + target);
    if ((y > 10 && player == "player2") || (y < 3 && player == "player1")) {
      if (mas[y][x].id == unt) {
        if (unt == 5) kingApp = true;
        console.log("_");
        cnx.clearRect(x * 50, y * 50, 50, 50);
        mas[y][x] = 0;
        temp.innerText = parseFloat(temp.innerText) + prise;
        temp1.innerText = parseFloat(temp1.innerText) - 1;
      } else {
        if (mas[y][x] == 0) {
          if (temp.innerText - prise >= 0 && target != "king") {
            temp.innerText -= prise;
            if (unt == 1) mas[y][x] = new dwarf(target, unt);
            if (unt == 4) mas[y][x] = new energy(target, unt);
            if (unt == 2) mas[y][x] = new hourse(target, unt);
            if (unt == 3) mas[y][x] = new pocket(target, unt);
            temp1.innerText = parseFloat(temp1.innerText) + 1;
          }
          if (kingApp == true && target == "king") {
            mas[y][x] = new king(target, unt);
            temp1.innerText = parseFloat(temp1.innerText) + 1;
            kingApp = false;
          }
          mas[y][x].player = player;
        }
      }
    }
    drow();
  }

  function gameLM(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    if (
      mas[y][x] != 0 &&
      mas[y][x].player == player &&
      !$(nextButton).prop("disabled")
    ) {
      if (mas[y][x].active) {
        current = mas[y][x].id;
        point.y = y;
        point.x = x;
      }
    } else {
      point.y = 0;
      point.x = 0;
      current = 0;
    }
    drow();
    console.log(mas);
  }

  function gameRM(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x + " " + y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    if (mas[y][x] == 0 && current != 0 && mas[point.y][point.x].active) {
      if (
        (mas[point.y][point.x].id == 1 || mas[point.y][point.x].id == 4) &&
        Math.abs(point.y - y) + Math.abs(point.x - x) <=
          mas[point.y][point.x].move
      ) {
        mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
      }
      if (
        mas[point.y][point.x].id == 2 &&
        Math.abs(point.y - y) + Math.abs(point.x - x) <=
          mas[point.y][point.x].move
      ) {
        mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
      }
      if (
        mas[point.y][point.x].id == 3 &&
        Math.abs(point.y - y) + Math.abs(point.x - x) <=
          mas[point.y][point.x].move
      ) {
        mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
      }
      if (
        mas[point.y][point.x].id == 5 &&
        Math.abs(point.y - y) + Math.abs(point.x - x) <=
          mas[point.y][point.x].move
      ) {
        mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
      }
    } else {
      if (mas[y][x].player != mas[point.y][point.x].player && current != 0) {
        if (
          ((Math.abs(point.y - y) <= 1 && Math.abs(point.x - x) <= 1) ||
            (mas[point.y][point.x].id == 3 &&
              Math.abs(point.y - y) + Math.abs(point.x - x) <= 4)) &&
          mas[point.y][point.x].atcAcc
        ) {
          mas[point.y][point.x].attackUnit(mas[y][x]);
          // mas[point.y][point.x].active = false;
        }
      }
    }
    point.y = 0;
    point.x = 0;
    current = 0;

    drow();
  }

  function inint() {
    for (let i = 0; i <= h; i++) {
      mas[i] = [];
      for (let y = 0; y <= w; y++) {
        mas[i][y] = 0;
      }
    }
  }

  function drow() {
    cnx.clearRect(0, 0, w * 100, h * 100);
    for (let i = 0; i <= h; i++) {
      cnx.moveTo(0, i * 50);
      cnx.lineTo(700, i * 50);
      for (let y = 0; y <= w; y++) {
        cnx.moveTo(y * 50, 0);
        cnx.lineTo(y * 50, 700);
        if (mas[i][y].heal <= 0) {
          if (mas[i][y].id == 5) {
            if (mas[i][y].player == player) {
              swal("Sorry, but you lose", {
                buttons: {
                  cancel: "OK",
                },
              }).then(() => {
                socket.emit("win", JSON.parse(jQuery.cookie("battle")).id);
                $.redirect("/", {}, "GET");
              });
            } else {
              swal("You win", {
                buttons: {
                  cancel: "OK",
                },
              }).then(() => {
                socket.emit("win", JSON.parse(jQuery.cookie("battle")).id);
                $.redirect("/", {}, "GET");
              });
            }
          }
          mas[i][y] = 0;
        }
        if (mas[i][y].player == "player1") {
          cnx.fillStyle = "#2B2B2B";
        } else {
          cnx.fillStyle = "#002B36";
        }
        if (mas[i][y].id == 1) {
          let u = document.getElementById("dwarf-t");
          cnx.fillRect(
            y * 50,
            i * 50 - ((mas[i][y].heal - 100) / 100) * 50,
            50,
            50 + ((mas[i][y].heal - 100) / 100) * 50
          );
          cnx.drawImage(u, y * 50, i * 50, 50, 50);
        }
        if (mas[i][y].id == 2) {
          let u = document.getElementById("hourse-t");

          cnx.fillRect(
            y * 50,
            i * 50 - ((mas[i][y].heal - 100) / 100) * 50,
            50,
            50 + ((mas[i][y].heal - 100) / 100) * 50
          );
          cnx.drawImage(u, y * 50, i * 50, 50, 50);
        }
        if (mas[i][y].id == 3) {
          let u = document.getElementById("pocket-t");
          cnx.fillRect(
            y * 50,
            i * 50 - ((mas[i][y].heal - 100) / 100) * 50,
            50,
            50 + ((mas[i][y].heal - 100) / 100) * 50
          );
          cnx.drawImage(u, y * 50, i * 50, 50, 50);
        }
        if (mas[i][y].id == 4) {
          let u = document.getElementById("energy-t");
          cnx.fillRect(
            y * 50,
            i * 50 - ((mas[i][y].heal - 100) / 100) * 50,
            50,
            50 + ((mas[i][y].heal - 100) / 100) * 50
          );
          cnx.drawImage(u, y * 50, i * 50, 50, 50);
        }
        if (mas[i][y].id == 5) {
          let u = document.getElementById("king-t");
          cnx.fillRect(
            y * 50,
            i * 50 - ((mas[i][y].heal - 100) / 100) * 50,
            50,
            50 + ((mas[i][y].heal - 100) / 100) * 50
          );
          cnx.drawImage(u, y * 50, i * 50, 50, 50);
        }
      }
    }
    cnx.stroke();
  }

  inint();
  document.getElementById("dwarf").onclick = function () {
    target = "dwarf";
    current = 1;
    prise = 7;
  };
  document.getElementById("hourse").onclick = function () {
    target = "hourse";
    current = 2;
    prise = 15;
  };
  document.getElementById("pocket").onclick = function () {
    target = "pocket";
    current = 3;
    prise = 5;
  };
  document.getElementById("energy").onclick = function () {
    target = "energy";
    current = 4;
    prise = 7;
  };
  document.getElementById("king").onclick = function () {
    target = "king";
    current = 5;
    prise = 0;
  };
  document.getElementById("button-start").onclick = function () {
    for (let i = 0; i <= h; i++) {
      for (let y = 0; y <= w; y++) {
        if (mas[i][y].id === 5) {
          acces = true;
        }
      }
    }
    if (!acces) {
      swal("should be king!!");
      return null;
    }
    socket.emit("readyToStartBattle", {
      id: JSON.parse(jQuery.cookie("battle")).id,
      iam: jQuery.cookie("session_id"),
      battleField: mas,
    });
    var units = this;
    socket.on("startBattle", function (data) {
      if (data.id != JSON.parse(jQuery.cookie("battle")).id) {
        return null;
      }
      parseBattleFeild(data.battleField);
      mas = data.battleField;
      console.log(mas);

      document.getElementById("units").style.display = "none";
      units.innerText = "next";
      units.style.marginTop = "200px";
      current = 0;
      canvas.oncontextmenu = function () {
        gameRM(event, current);
        return false;
      };
      canvas.onclick = function () {
        gameLM(event, current);
      };
      units.onclick = next;
      if (player != "player1") {
        $(units).prop("disabled", true);
      }
      drow();
    });
  };

  function next() {
    for (let i = 0; i <= h; i++) {
      for (let y = 0; y <= w; y++) {
        if (mas[i][y] && acces) {
          mas[i][y].activeUnit();
          drow();
        }
      }
    }
    $(this).prop("disabled", true);
    nextButton = this;
    socket.emit("nextStep", {
      id: JSON.parse(jQuery.cookie("battle")).id,
      iam: jQuery.cookie("session_id"),
      battleField: mas,
    });
  }

  console.log(JSON.parse(jQuery.cookie("battle")));

  ///socket
  var socket = io.connect("http://192.168.0.104:3000");

  socket.on("message", function (data) {
    console.log(data);
  });
  socket.on("lose", function (data) {
    console.log("lose");
    if (data === JSON.parse(jQuery.cookie("battle")).id) {
      swal("Sorry, but you lose", {
        buttons: {
          cancel: "OK",
        },
      }).then(() => {
        $.redirect("/", {}, "GET");
      });
    }
  });
  socket.on("accesStep", function (data) {
    if (data.id != JSON.parse(jQuery.cookie("battle")).id) {
      return null;
    }
    parseBattleFeild(data.battleField);
    mas = data.battleField;
    console.log(mas);
    if (data.acces == jQuery.cookie("session_id")) {
      $(nextButton).prop("disabled", false);
    }
    drow();
  });
  function parseBattleFeild(battle) {
    for (let i = 0; i <= h; i++) {
      for (let y = 0; y <= w; y++) {
        if (battle[i][y] != 0) {
          var temp = battle[i][y].player;
          var temp2 = battle[i][y].heal;
          if (battle[i][y].id == 1)
            battle[i][y] = new dwarf(battle[i][y].name, battle[i][y].id);
          if (battle[i][y].id == 4)
            battle[i][y] = new energy(battle[i][y].name, battle[i][y].id);
          if (battle[i][y].id == 2)
            battle[i][y] = new hourse(battle[i][y].name, battle[i][y].id);
          if (battle[i][y].id == 3)
            battle[i][y] = new pocket(battle[i][y].name, battle[i][y].id);
          if (battle[i][y].id == 5)
            battle[i][y] = new king(battle[i][y].name, battle[i][y].id);
          battle[i][y].player = temp;
          battle[i][y].heal = temp2;
        }
      }
    }
  }
});
