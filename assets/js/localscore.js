let score = String(Math.floor(Math.random() * 100));
let username = `test${score}`;


let usernameButton = document.getElementById("submit_user");

usernameButton.addEventListener('click', function(){
    console.log('button pressed');
    setScore();
});


function setScore() {
    document.getElementById("new_score").innerHTML = `Well done ${username} you scored ${score}`;
    localStorage.name = username;
    localStorage.score = score; // move this to high score function
    getScore();
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
