var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var lvl=0;
var end=0;

function nextSequence(){
    userPattern=[];
    lvl++;
    $("h1").html("Level "+lvl);
    var r=Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[r]);
    $("#" + buttonColors[r]).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio1 = new Audio("sounds/" + buttonColors[r] + ".mp3");
    audio1.play();
}

function animatePressed(btncolor){
    $("#"+btncolor).addClass("pressed");
    setTimeout(function(){
        $("#"+btncolor).removeClass("pressed")},100
    );
}

$("h1").html("Press A to start the game");
$(document).on("keypress",function(event){
    if((event.key=="A" || event.key=="a") && end==0){
        play();
    }
})

$(".btn").on("click",function(){
    var button=$(this).attr("id");;
    userPattern.push(button);
    animatePressed(button);
    var audio2 = new Audio("sounds/" + button + ".mp3");
    audio2.play();
    correctAns(userPattern.length-1);
})


function play(){
    nextSequence();
}

function correctAns(currentlevel){
    if(userPattern[currentlevel]===gamePattern[currentlevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                play();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
        var audio3=new Audio("sounds/wrong.mp3");
        audio3.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h1").html("Game Over...Press any key to restart");
        },200)
        end=1;
        $(document).on("keypress",function(){
            $(document).off("keypress");
            startOver();
        })
    }
    return true;
}

function startOver(){
    gamePattern=[];
    lvl=0;
    end=0;
    play();
}