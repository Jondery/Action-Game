let overMusic = new Audio('gameover.mp3');
let bgMusic = new Audio('bgMusic.mp3');
bgMusic.play();
score = 0;
cross = true;
document.onkeydown = function (e) {
    //Coding for player
    // console.log("The user presses", e.keyCode);
    if (e.keyCode == 38) {
        Player = document.querySelector('.Player');
        Player.classList.add('animatedPlayer');
        setTimeout(() => {
            Player.classList.remove('animatedPlayer');
        }, 700);
    }

    if (e.keyCode == 39) {
        Player = document.querySelector('.Player');
        //first we've to take computed value and then add some more value in it
        PlayerX = parseInt(window.getComputedStyle(Player, null).getPropertyValue('left'));
        Player.style.left = PlayerX + 100 + "px";
    }

    if (e.keyCode == 37) {
        Player = document.querySelector('.Player');
        //first we've to take computed value and then add some more value in it
        PlayerX = parseInt(window.getComputedStyle(Player, null).getPropertyValue('left'));
        Player.style.left = PlayerX - 100 + "px";
    }
}

//Logic if the dragon collides with player
//we want to check the logic repeatedly so we use setInterval
setInterval(() => {
    //first of all we've to import divs here
    gameOver = document.querySelector('.gameOver');
    Player = document.querySelector('.Player');
    Dragon = document.querySelector('.dragon');

    // x and y components of Player    
    // px = window.getComputedStyle(Player, null).getPropertyValue('left');
    //we are getting values in px so we have to convert it in numbers
    px = parseInt(window.getComputedStyle(Player, null).getPropertyValue('left'));
    py = parseInt(window.getComputedStyle(Player, null).getPropertyValue('top'));
    // x and y components of Deagon
    dx = parseInt(window.getComputedStyle(Dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(Dragon, null).getPropertyValue('top'));

    //condition to check collision
    offsetX = Math.abs(px - dx);
    offsetY = Math.abs(py - dy);
    // console.log(offsetX, offsetY);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = 'visible';
        // gameOver.style.animation = "animateZoom 2s linear ";
        overMusic.play();
        bgMusic.pause();
        Dragon.classList.remove('animatedDragon');
        // Player.classList.remove('Player');
        
        
    }
    else if (offsetX < 110 && cross) {
        bgMusic.play();
        score += 1;
        upadateScore(score);
        cross = false; //after incrementing score, cross becomes zero

        setTimeout(() => {
            cross = true; //after one second cross again becomes zero
        }, 1000);

        //speed of dragon increses with score
        setTimeout(() => { //set time out means the speed increases after the player passed the dragon
            newSpeed = parseFloat(window.getComputedStyle(Dragon, null).getPropertyValue('animation-duration'));
            // SpeedInc = newSpeed - 0.3;
            console.log(SpeedInc);
            Dragon.style.animationDuration = SpeedInc + 's';

        }, 500);

    }
}, 100);


function upadateScore(score) {
    scoreInc = document.querySelector('.score');
    scoreInc.innerHTML = "Your Score: " + score;
}