var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function () {
  if (started === false) {
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audioClick = new Audio("sounds/" + name + ".mp3");
  audioClick.play();
};

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  $(this).fadeOut(100).fadeIn(100);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence () {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
};

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
      var audioWrong = new Audio("sounds/wrong.mp3");
      audioWrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key To Restart");
      startOver();
  };
};

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
};

function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};
