var buttonColours = ["red", "blue", "green", "yellow"]; //Button colours array
var gamePattern = []; //Game pattern empty array
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level); //update level title
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); // playSound function called
  animatePress(userChosenColour); // animatePress function called
  checkAnswer(userClickedPattern.length - 1); // function checkAnswer called
});

//checkAnswer function to check answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check if user has finished his sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        //call nextSequence afer user finished his sequence
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong"); //Play wrong sound
    $("body").addClass("game-over"); // Add game-over class
    $("#level-title").text("Game Over, Press Any Key to Restart"); // change title to Game over

    setTimeout(function () {
      //Remove game-over class
      $("body").removeClass("game-over");
    }, 200);
    startOver(); //Restart function called
  }
}
