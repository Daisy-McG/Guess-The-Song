let score = String(Math.floor(Math.random() * 100));
let username = "test2"

let usernameButton = document.getElementById("submit_user");

usernameButton.addEventListener('click', function(){
	document.getElementById("localdata").innerHTML = "button pressed";
    console.log('button pressed');
    setScore();
});

function setScore() {
    console.log(`setting username to: ${username}`);
    console.log(`setting score to ${score}`);
    localStorage.setItem("username",username, "score",score);
    getScore();
}

function getScore() {
    let updateUser;
    let updateScore;
    for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem("username",[i]));
    console.log(localStorage.getItem("score",[i]));
    updateUser = localStorage.getItem("username",[i]);
    updateScore = localStorage.getItem("username",[i]);
    document.getElementById("localdata").innerHTML = `Username ${updateUser} scored ${updateScore}`;
    }
}