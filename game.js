
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

if(!started){
    $(document).on("keydown", function(){
        nextSequence();
        started = true;
    });
}


$(".btn").on("click", function(){
    
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    if(checkAnswer(userClickedPattern.length - 1)){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
            
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
});



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
        
        return false;
    }
    return true;
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}