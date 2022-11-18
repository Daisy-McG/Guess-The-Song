let currentSong = {};
let songs = [];
let userName;

/**
 * Function to load genre specific songs
 */
const loadGenreSongs = (genre) => {
    let results = songs.filter(song => {
        return song.genre === genre;
      });
    songs = results;
}

/**
 * Function to load all songs
 */
async function loadAllSongs() {
    const res = await fetch("assets/js/songs.json");
    const data = await res.json();
    songs = data;
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
}

let userInfo = document.getElementById("user-info")
// Event Listener to Get user info
userInfo.addEventListener("submit", e=>{
    e.preventDefault();
    //get username
    userName = document.getElementById("user-name").value;
    //get category selection
    let selectedCategory = document.querySelector("#user-info input[type='radio']:checked").value;
    console.log(selectedCategory)
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
 * Function to compare user answer
 */
function checkAnswer(answer){
    if(answer.toLowerCase() === currentSong.title.toLowerCase()){
        console.log("correct answer")
    } else{
        console.log("incorrect Answer")
    }
}


// Event Listener to get song on initial page load
window.addEventListener("load", () => {
    songs = loadAllSongs();
});
