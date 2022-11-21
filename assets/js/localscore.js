let score = localStorage.score;
let username = localStorage.name;
let unique = String(Date.now());
let scoreboard = [score, username];

/* Function to be run on page load
*  Displays final score
*  Runs the rest of the score checking and updates
*/
function setScore() {
    // Print to score page
    if(score > 0){
        localStorage.setItem(unique, scoreboard);
        document.getElementById("new_score").innerHTML = `
        <i class="fa-solid fa-music"></i>
        <p> Well done ${username}. </p>
        <p> You scored ${score}. </p>`;
    } else {
        document.getElementById("new_score").innerHTML = `
        <i class="fa-solid fa-music"></i>
        <p> Sorry ${username} no correct answers this time. </p>
        <p> Have another try. </p>`;
    }
    // Call the rest of the checking and update functions
    getHighScore();
    checkHighscore();
    getScoreboard();
}

/* 
* Function fetches and displays the current high score
* If blank, initialises to 0
*/
function getHighScore() {
    let topUsername = localStorage.currentTopname;
    let topScore = localStorage.currentHighscore;
    if(topScore) {
        document.getElementById("high_score").innerHTML = `
        <i class="fa-solid fa-music"></i>
        <p>The current high score is: ${topScore}. </p>
        <p> Scored by: ${topUsername}. </p>`;        
    } else {
        localStorage.currentTopname = "No Previous High Score Recorded";
        localStorage.currentHighscore = 0;
        document.getElementById("high_score").innerHTML = "";
    }
}

/*
* Function checks previous high score
* Compares current score to high score
* Updates high score if new high score
* Congratulates player
*/
function checkHighscore() {
    let currentHighscore = parseInt(localStorage.currentHighscore);
    if (score > currentHighscore) {
        localStorage.currentTopname = username;
        localStorage.currentHighscore = score;
        document.getElementById("display_message").innerHTML = `
        <i class="fa-solid fa-music"></i>
        <p>Congratulations on a new high score!</p>`;
    } else {
        document.getElementById("display_message").innerHTML = "";
    }
}

/*
* Scoreboard
*/

function getScoreboard() {
let currentLength = localStorage.length;
let tempBoard = [];
let keys = Object.keys(localStorage);
let i = 0;
while (i <= currentLength) {
    tempBoard.push(localStorage.getItem(keys[i]));
    i++;
}

tempBoard = tempBoard.sort();

let scoreboardLI;
let j = 0;
while (j <= 5) {
    scoreboardLI += `<li>${tempBoard[i]}</li>`;
    j++;
}
document.getElementById("display_high5").innerHTML = scoreboardLI;
}


// Run updates on page load
document.addEventListener('DOMContentLoaded', function() {
setScore();
}, false);