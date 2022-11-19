let currentSong = {};
let songs = [];
let totalSongs = 0;
let userName;
let livesLeft = 3;
let songNumber = 1;

/**
 * Function to load genre specific songs
 */
const loadGenreSongs = (genre) => {
    let results = songs.filter(song => {
        return song.genre === genre;
      });
    songs = results;
    totalSongs = songs.length;
}

/**
 * Function to load all songs
 */
async function loadAllSongs() {
    const res = await fetch("assets/js/songs.json");
    const data = await res.json();
    songs = data;
    totalSongs = songs.length;
    getSong();
}

/**
 * Gets a song from the array
 */
const getSong = () => {
    let index = Math.floor(Math.random()*songs.length);
    currentSong = songs[index];
    songs.pop(index);
    addSongToIframe();
}

/**
 * Function to update HTML with song
 */
const addSongToIframe = () => {
    document.getElementById("spotify-player").src = `https://open.spotify.com/embed/track/${currentSong.id}`;
    noCheating();
}

/**
 * Print noCheating to console
 */

const noCheating = () => {
    console.log("%cNo Cheating!", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");
}

let userInfo = document.getElementById("user-info")
// Event Listener to Get user info
userInfo.addEventListener("submit", e=>{
    e.preventDefault();
    //get username
    userName = document.getElementById("user-name").value;
    // remove white space before and after
    userName = userName.replace(/^\s+|\s+$/gm,'');
    //get category selection
    let selectedCategory = document.querySelector("#user-info input[type='radio']:checked").value;

    //clear username input value
    document.getElementById("user-name").value = "";
    //filter if a category is selected
    if(selectedCategory !== "all"){
        loadGenreSongs(selectedCategory)
    }
    //hide and show correct elements from radio box
    document.querySelectorAll("[data-element]").forEach(el=>{
        el.getAttribute("data-element") === "game" ? el.classList.remove("hide") : el.classList.add("hide");
    });

    // Update question counter
    document.getElementById("q-counter").innerHTML = `Song ${songNumber} out of ${totalSongs}`;

     // Add function here to start the game
})



let songInput = document.getElementById("user-song")


// Event Listener to Get user answer
songInput.addEventListener("submit", e=>{
    e.preventDefault()
    let input = document.getElementById("user-answer");
    let answer = input.value;
    input.value = ""
    checkAnswer(answer);
})

/**
 * Function to compare user answer.
 * Gets new song on correct guess.
 * Decreases lives on incorrect guess.
 */
function checkAnswer(answer){
    if(answer.toLowerCase() === currentSong.title.toLowerCase()){
        songNumber += 1;
        // Needs to be updated with time left
        incrementScore(50);
        // Update question counter
        document.getElementById("q-counter").innerHTML = `Song ${songNumber} out of ${totalSongs}`;
        getSong();
    } else{
        livesLeft -= 1;
        let lives = document.getElementsByClassName("life");
        if (livesLeft === 2) {
            lives[2].src = `assets/images/skull-red.svg`;
        }
        else if (livesLeft == 1){
            lives[1].src = `assets/images/skull-red.svg`;
        }
    }
}

/**
 * Function to increment score
 * @param {int} score 
 */
const incrementScore = (score) => {
	let currentScore = parseInt(document.getElementById("score").innerHTML);
	currentScore += score;
	document.getElementById("score").innerHTML = currentScore;
}

// Event Listener to get songs on initial page load
window.addEventListener("load", () => {
    songs = loadAllSongs();
});
