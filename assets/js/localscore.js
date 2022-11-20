let score = localStorage.score;
let username = localStorage.name;


/* Function to be run on page load
*  Displays final score
*  Runs the rest of the score checking and updates
*/
function setScore() {
    // Print to score page
    if(score > 0){
        document.getElementById("new_score").innerHTML = `Well done ${username} you scored ${score}`;
    } else {
        document.getElementById("new_score").innerHTML = `Sorry ${username} no correct answers this time. 
        Have another try.`;
    }
    // Call the rest of the checking and update functions
    getHighScore();
    checkHighscore();
    
}

/* 
* Function fetches and displays the current high score
* If blank, initialises to 0
*/
function getHighScore() {
    let topUsername = localStorage.currentTopname;
    let topScore = localStorage.currentHighscore;
    if(topScore) {
        document.getElementById("high_score").innerHTML = `The current high score is ${topUsername}: ${topScore}`;
    } else {
        localStorage.currentTopname = "No Players Yet";
        localStorage.currentHighscore = 0;
        document.getElementById("high_score").innerHTML = "No high score recorded";
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
        document.getElementById("display_message").innerHTML = "Congratulations on a new high score";
    } else {
        document.getElementById("display_message").innerHTML = "";
    }
}

// Run updates on page load
document.addEventListener('DOMContentLoaded', function() {
    setScore();
}, false);