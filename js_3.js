var player1Score = 10;
var player2Score = 10;
var lpad = document.getElementById("left-pad");
var rpad = document.getElementById("right-pad");
var ball = document.getElementById("ball");
var win = document.getElementById("win");
var leftScoreDisplay = document.getElementById("left-score");
var rightScoreDisplay = document.getElementById("right-score");

var p1= window.opener.document.getElementById("p1").value.split(" ")[0];
var p2= window.opener.document.getElementById("p2").value.split(" ")[0];

p1 = p1.toUpperCase();
p2 = p2.toUpperCase();

var posx = 0;
var posy = 100;
var speedx = 5;
var speedy = 5;
var winwidth = win.clientWidth;
var winheight = win.clientHeight;


var player1 = 0; 
var player2 = 0; 

function moveBall() 
{
    posx += speedx;
    posy += speedy;

    var lpadRect = lpad.getBoundingClientRect();
    var rpadRect = rpad.getBoundingClientRect();
    var ballRect = ball.getBoundingClientRect();

    if (posx >= winwidth - ball.clientWidth || posx <= 0) {

        if (posx >= winwidth - ball.clientWidth) 
        {
            speak(p2+" missed");
            player1Score++;
            leftScoreDisplay.innerHTML = p1+" : "+player1Score; 
        }
        else {
            speak(p1+ " missed");
            player2Score++;
            rightScoreDisplay.innerHTML = p2+" : "+player2Score;
            
        }

        if (player1Score == 10 || player2Score == 10) 
        {
            
            if (player1Score > player2Score) 
            {
                leftScoreDisplay.innerHTML = player1Score;
                speak("Congratulations "+p1+" won the match and "+p2 +" better luck next time");
                alert("<<<<<<<<<<<<<_GAME OVER_>>>>>>>>>>>>\n\n\n"+"Congratulations......\n\n\n " + p1 + " Won !!!!!!!!!");
            }
            else if (player1Score < player2Score) 
            {
                rightScoreDisplay.innerHTML = player2Score;
                speak("Congratulations "+p2+" won the match and "+p1 +" better luck next time");
                alert("<<<<<<<<<<<<<_GAME OVER_>>>>>>>>>>>>\n\n\n"+"Congratulations......\n\n " + p2 + " Won !!!!!!!!!");
                
            }
            else 
            {
                alert("Ohhh!! Both Tie....");
            }
            gameReload();
        }
        resetBall();
    }

    
    if (ballRect.left <= lpadRect.right && ballRect.right >= lpadRect.left &&
        ballRect.top <= lpadRect.bottom && ballRect.bottom >= lpadRect.top) {
        if (speedx < 0) 
            {
                speak(p1+" hitted");
            posx = lpadRect.right + ball.clientWidth;
            
        }
        speedx = -speedx; 
    }

    if (ballRect.right >= rpadRect.left && ballRect.left <= rpadRect.right &&
        ballRect.top <= rpadRect.bottom && ballRect.bottom >= rpadRect.top) 
        {
        if (speedx > 0) 
            {
                speak(p2+" hitted");
            posx = rpadRect.left - ball.clientWidth; 
        }
        speedx = -speedx; 
    }

    if (posy <= 0 || posy >= winheight - ball.clientHeight) 
    {
        speedy = -speedy; 
    }

    ball.style.left = posx + 'px';
    ball.style.top = posy + 'px';
    requestAnimationFrame(moveBall);
}

function resetBall() 
{
    posx = winwidth / 2 - ball.clientWidth / 2;
    posy = Math.round(Math.random() * (winheight - 10));
    speedx = -speedx;
}

function gameReload() 
{
    player1Score = 0;
    player2Score = 0;
    leftScoreDisplay.innerHTML = p1+" : "+ "0";
    rightScoreDisplay.innerHTML = p2+" : "+ "0" ;
    resetBall();
}

function leftpaddleupper() 
{
    player1 -= 15;
    if (player1 >= -280)
        lpad.style.transform = "translateY(" + player1 + "%)";
    else
        player1 += 15;
}

function leftpaddlelower() 
{
    player1 += 15;
    if (player1 <= 180)
        lpad.style.transform = "translateY(" + player1 + "%)";
    else
        player1 -= 15;
}

function rightpaddleupper() 
{
    player2 -= 15;
    if (player2 >= -280)
        rpad.style.transform = "translateY(" + player2 + "%)";
    else
        player2 += 15;
}

function rightpaddlelower() 
{
    player2 += 15;
    if (player2 <= 180)
        rpad.style.transform = "translateY(" + player2 + "%)";
    else
        player2 -= 15;
}

function checkKey(e) 
{
    var k = e.code;
    switch (k) 
    {
        case "KeyW": leftpaddleupper();
            break;
        case "KeyZ": leftpaddlelower();
            break;
        case "KeyO": rightpaddleupper();
            break;
        case "KeyM": rightpaddlelower();
            break;
    }
}

this.addEventListener("keydown", checkKey);
gameReload();
moveBall();

function speak(str) 
{
    synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(str);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; 

    synth.speak(utterance);
}