let score;
let username;


let usernameButton = document.getElementById("submit_user");

usernameButton.addEventListener('click', function(){
    console.log('button pressed');
    score = String(Math.floor(Math.random() * 100));
    username = `test${score}`;
    setScore();
});


function setScore() {
    document.getElementById("new_score").innerHTML = `Well done ${username} you scored ${score}`;
    // localStorage.name = username;
    // localStorage.score = score
    getScore();
    checkHighscore();
}


function getScore() {
    // let current_topuser = localStorage.getItem("username");
    // let current_topscore = localStorage.getItem("score");
    // console.log(localStorage.getItem("score"));
    // document.getElementById("high_score").innerHTML = `The current high score is ${current_topuser}: ${current_topscore}`;

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
    }
}