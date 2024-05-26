let flag = false;
$(document).on("keydown", function () {
  if (!flag) {
    $("h1").html("Level 1");
    flag = true;
    startGame();
  }
});
function startGame() {
  let level = 1;
  const colors = ["red", "green", "blue", "yellow"];
  let seqGenerated = [];
  nextLevel();

  function nextLevel() {
    $("h1").html(`Level ${level}`);
    let num1 = Math.floor(Math.random() * 4);
    seqGenerated.push(colors[num1]);
    console.log(seqGenerated);
    displaySeq();
  }

  function displaySeq() {
    let len = seqGenerated.length;
    let colorId = seqGenerated[len - 1];
    $(`#${colorId}`).addClass("pressed");
    setTimeout(function () {
      $(`#${colorId}`).removeClass("pressed");
    }, 100);
    takeUserInput();
  }

  function takeUserInput() {
    let ct = 0;
    $(".btn")
      .off("click")
      .on("click", function () {
        let key = this.id.trim();
        $(`#${key}`).addClass("pressed");
        setTimeout(function () {
          $(`#${key}`).removeClass("pressed");
        }, 100);
        var audio = new Audio(`sounds/${key}.mp3`);
        audio.play();
        if (key === seqGenerated[ct]) {
          ct++;
          if (ct === seqGenerated.length) {
            level++;
            setTimeout(nextLevel, 1000);
          }
        } else {
          var audio = new Audio(`sounds/wrong.mp3`);
          audio.play();
          $("h1").html("The game is over....<br> Press any key to Start Again");
          $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          resetGame();
        }
      });
  }

  function resetGame() {
    flag = false;
    level = 1;
    seqGenerated = [];
  }
}
