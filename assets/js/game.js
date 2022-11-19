let currentSong = {};
let songs = [];
let totalSongs = 0;
let userName;
let livesLeft = 3;

/**
 * Function to load genre specific songs
 */
const loadGenreSongs = (genre) => {
    if(genre !== "all"){
        let results = songs.filter(song => {
            return song.genre === genre;
          });
        songs = results;
        totalSongs = songs.length;
    }
    getSong();
}

/**
 * Function to load all songs
 */
async function loadAllSongs() {
    const res = await fetch("assets/js/songs.json");
    const data = await res.json();
    songs = data;
    totalSongs = songs.length;
}

/**
 * Gets a song from the array
 */
const getSong = () => {
    let index = Math.floor(Math.random()*songs.length);
    currentSong = songs[index];
    songs.pop(index);
    addSongToIframe();
    displayCounter();
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

    //clear username input value
    document.getElementById("user-name").value = "";
    //hide and show correct elements from radio box
    document.querySelectorAll("[data-element]").forEach(el=>{
        el.getAttribute("data-element") === "game" ? el.classList.remove("hide") : el.classList.add("hide");
    });
    
    //filter if a category is selected
    loadGenreSongs(selectedCategory)
    // Update question counter
    document.getElementById("q-counter").innerHTML = `Song ${totalSongs-songs.length+1} out of ${totalSongs}`
    
})


let questionCorrectlyAnswered = false
/**
 * Function to update HTML with song
 */
function displayCounter(){
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 30;
    const ALERT_THRESHOLD = 10;
    
    const COLOR_CODES = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
      },
      alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
      }
    };
    
    let timePassed = 0;
    const TIME_LIMIT = 60;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;
    
    document.getElementById("watch").innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
      )}</span>
    </div>
    `;
    
    startTimer();
    checkCorrectAnswer();

    //When timer reaches 0
    function onTimesUp() {
      clearInterval(timerInterval);
      removeLife();
      getSong()
    }
    
    function checkCorrectAnswer(){
        setInterval(()=>{
            if(questionCorrectlyAnswered === true){
                clearInterval(timerInterval);
                timePassed = 0;
                timeLeft = 60;
                questionCorrectlyAnswered = false
            }
        },500)
    }
    
    function startTimer() {
      timerInterval = setInterval(() => {
        console.log(timePassed)
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
    
        if (timeLeft === 0) {
          onTimesUp();
        }
      }, 1000);
    }
    
    function formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
    
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
    
      return `${minutes}:${seconds}`;
    }
    
    function setRemainingPathColor(timeLeft) {
      const { alert, warning, info } = COLOR_CODES;
      if (timeLeft <= alert.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(warning.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(alert.color);
      } else if (timeLeft <= warning.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(info.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(warning.color);
      }
    }
    
    function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }
    
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }

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
        questionCorrectlyAnswered = true;
        console.log(questionCorrectlyAnswered)
        getSong()
    } else{
        removeLife()
    }
}

function removeLife(){
    livesLeft -= 1;
        // Change life image colour when answer is wrong
        let lives = document.getElementsByClassName("life");
        if (livesLeft === 2) {
            lives[2].src = `assets/images/skull-red.svg`;
        }
        else if (livesLeft == 1){
            lives[1].src = `assets/images/skull-red.svg`;
        }
}


// Event Listener to get song on initial page load
window.addEventListener("load", () => {
    songs = loadAllSongs();
});
