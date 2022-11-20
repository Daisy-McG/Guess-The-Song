/*
/ All of this is just for testing purposes
*/

let score;
let username;


let usernameButton = document.getElementById("submit_user");

usernameButton.addEventListener('click', function(){
    score = String(Math.floor(Math.random() * 1000));
    username = `test${score}`;
    setScore();
});
/*
***************************************************************************
*/


/* 
/ Feed in the username and their score here
*/

function setScore() {
    document.getElementById("new_score").innerHTML = `Well done ${username} you scored ${score}`;
    getScore();
    checkHighscore();
}


function getScore() {
    let topUsername = localStorage.name;
    let topScore = localStorage.score;
    document.getElementById("high_score").innerHTML = `The current high score is ${topUsername}: ${topScore}`;
}

function checkHighscore() {
    let currentHighscore = parseInt(localStorage.score);
    if (score > currentHighscore) {
        localStorage.name = username;
        localStorage.score = score;
        document.getElementById("display_message").innerHTML = "Congratulations on a new high score";
    } else {
        document.getElementById("display_message").innerHTML = "";
    }
}