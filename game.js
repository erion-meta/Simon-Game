const buttonColours = ["red", "blue", "green", "yellow"]; //Button colours array
let gamePattern = []; //Game pattern empty array
let userClickedPattern = [];
let started = false;
let level = 0;
const startGameButton = document.getElementById("startGame");

startGameButton.addEventListener("click", () => {
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
    $("#level-title").text("Game Over, Press Start Game to Restart"); // change title to Game over

    setTimeout(function () {
      //Remove game-over class
      $("body").removeClass("game-over");
    }, 200);
    startOver(); //Restart function called
  }
}
function nextSequence() {
  //Function for next sequence
  userClickedPattern = [];
  level++; //increase level
  $("#level-title").text("Level " + level); //update level title
  var randomNumber = Math.floor(Math.random() * 4); //Random number between 0 and 3

  // Random colours variable
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  //Function to animate button click
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  //Audio play
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function startOver() {
  //Restart function
  level = 0;
  gamePattern = [];
  started = false;
}
