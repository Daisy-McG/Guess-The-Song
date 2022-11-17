let currentSong = {};
let songs = [];

/**
 * Function to load genre specific songs
 */
const loadGenreSongs = (genre) => {

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
    console.log(songs);
    addSongToIframe();
}

/**
 * Function to update HTML with song
 */
const addSongToIframe = () => {
    document.getElementById("spotify-player").src = `https://open.spotify.com/embed/track/${currentSong.id}`;
}


// Event Listener to get song on initial page load
window.addEventListener("load", () => {
    songs = loadAllSongs();
});
