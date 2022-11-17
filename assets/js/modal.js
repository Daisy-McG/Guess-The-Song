// Get the modal
let modal = document.getElementById("rules_modal");

// Get the button that opens the modal
let rules = document.getElementById("rules");

// Get the <span> element that closes the modal
let span = document.getElementById("close_rules");

// When the user clicks on the button, open the modal
rules.addEventListener('click', function () {
	modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function () {
	modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
});