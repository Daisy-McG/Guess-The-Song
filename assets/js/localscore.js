let score = Math.floor(Math.random() * 100);

let usernameButton = document.getElementById("submit_user");
usernameButton.addEventListener('click', function(){
	console.log('button pressed');
    validateUsername();
});

function validateUsername() {
    console.log('validate username');
	let username = document.getElementById("username").value;
	username = username.trim();
	if (!username) {
		alert('Username cannot be blank');
        console.log('username blank');
	} else {
        console.log(username)
        setScore();
        console.log(localStorage.length)
    }
}

function setScore() {
    localStorage.setItem(username, score);
}