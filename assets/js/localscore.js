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
    for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem("username",[i]));
    }
}