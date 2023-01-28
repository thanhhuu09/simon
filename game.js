var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

/**
 * Khi người dùng click vào 1 màu nào đó, chúng ta sẽ thêm vào mảng userClickedPattern
 * Sau đó kiểm tra kết quả bằng hàm checkAnswer
 */
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown", function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
/**
 * Lượt đi của máy:
 * reset những màu mà user đã chọn về rỗng
 * tăng biến level lên 1
 * push mới màu random vào biến gamePattern
 */
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 3) + 1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () { 
        $("#"+currentColor).removeClass("pressed");
     },100)
}

/**
 * tham số truyền vào checkAnswer là (userClickedPattern.length - 1)
 */
function checkAnswer(currentLevel) {
    console.log("gamePattern: " + gamePattern);
    console.log("userClickedPattern: " + userClickedPattern);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play(); 
}
    

