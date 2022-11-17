// Get the modal
var modal = document.getElementById("instructions_modal");

// Get the button that opens the modal
var btn = document.getElementById("instructions_modal_btn");

// Get the <span> element that closes the modal
var span = document.getElementById("instructions_modal_close");

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


// Code for timer

// Attach event listener to start button

let startButton = document.getElementById("startbutton");
startButton.addEventListener('click', function(){
	let guessButton = document.getElementById('submitguess');
	guessButton.classList.remove('disable');
});

let timer = 60;
let countdown = setInterval(() => {
	if (timer > 0) {
		document.getElementById("timer").innerHTML = timer;
		timer -= 1;
	}
}, 1000);


// Increment score

function incrementScore() {
	let currentScore = parseInt(document.getElementById("score").innerHTML);
	currentScore += 1;
	document.getElementById("score").innerHTML = currentScore;
}

// Attach event listener to guess button

let guessButton = document.getElementById("submitguess");
guessButton.addEventListener('click', function(){
	// check the answer here
	incrementScore();
});