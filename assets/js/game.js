let currentSong = {};
let songs = [];

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
