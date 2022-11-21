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
  let main = document.getElementById("game-background");
  if (genre === "Rock") {
    main.style.backgroundImage = "url('assets/images/drummer.jpg')";
  } else if (genre === "Pop") {
    main.style.backgroundImage = "url('assets/images/disco-ball.jpg')";
  } else if (genre === "Country") {
    main.style.backgroundImage = "url('assets/images/guitar.jpg')";
  }
  if (genre !== "all") {
    let results = songs.filter((song) => {
      return song.genre === genre;
    });
    songs = results;
    totalSongs = songs.length;
  }
  getSong();
};

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
 * Function to get a song from the array
 * If user has no lives left, game will end
 */
const getSong = () => {
  if (songs.length === 0) {
    window.location.href = "scoreboard.html";
  }
  let index = Math.floor(Math.random() * songs.length);
  currentSong = songs[index];
  songs.pop(index);
  checkSong();
  addSongToIframe();
  displayCounter();
};

/**
 * Function to update HTML with song
 */
const addSongToIframe = () => {
  document.getElementById(
    "spotify-player"
  ).src = `https://open.spotify.com/embed/track/${currentSong.id}`;
  noCheating();
};

/**
 * Function to get song from API
 */
let checkSong = () => {
  // currentSong.id = 3
  fetch(`https://kareoke.p.rapidapi.com/v1/song/spotify?id=${currentSong.id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => songExists(data));
};

/**
 * Function to check if song doesnt exist on spotify
 * Attempt to get a new song
 */
const songExists = (song) => {
  if (song.msg === `We couldn't find a data with this id`) {
    getSong();
  }
};

/**
 * Print noCheating to console
 */

const noCheating = () => {
  console.log(
    "%cNo Cheating!",
    "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
  );
};

let userInfo = document.getElementById("user-info");
// Event Listener to Get user info
userInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  //get username
  userName = document.getElementById("user-name").value;
  // remove white space before and after
  userName = userName.replace(/^\s+|\s+$/gm, "");
  // send username to storage
  localStorage.name = userName;
  //get category selection
  let selectedCategory = document.querySelector(
    "#user-info input[type='radio']:checked"
  ).value;

  //clear username input value
  document.getElementById("user-name").value = "";
  //hide and show correct elements from radio box
  document.querySelectorAll("[data-element]").forEach((el) => {
    if (el.getAttribute("data-element") === "game") {
        el.classList.remove("hide");
    }
    else {
        el.classList.add("hide");
    }
  });

  //filter if a category is selected
  loadGenreSongs(selectedCategory);
  // Update question counter
  document.getElementById(
    "q-counter"
  ).innerHTML = `Song ${songNumber} out of ${totalSongs}`;

  // Add function here to start the game
});

// variables for the counter
let timePassed = 0;
let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let WARNING_THRESHOLD = 30;
let ALERT_THRESHOLD = 15;
const FULL_DASH_ARRAY = 283;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

/**
 * Function display the counter
 */
function displayCounter() {
  document.getElementById("main-timer").innerHTML = `
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
}

/**
 * Function to start the countdown
 */
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById(`base-timer-label`).innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      wrongInputOrTimesUp();
    }
  }, 1000);
}

/**
 * Function to format the time in MinMin:SecSec format
 */
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

/**
 * Function to change color of timer
 */
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

/**
 * Function to calculate time franction for the dasharray
 */
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

/**
 * Functionstablish the dasharray
 */
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById(`base-timer-path-remaining`)
    .setAttribute("stroke-dasharray", circleDasharray);
}

let bonusTimerInterval = null;
let bonusCount = 30;
/**
 * Function to trigger Bonus question
 */
function bonusQuestion() {
  let artist = currentSong.artist;
  let title = currentSong.title;
  let releaseYear = Number(currentSong.release_year);
  let possible_dates = [releaseYear];
  while (possible_dates.length < 4) {
    let option =
      Math.floor(Math.random() * (releaseYear + 3 - (releaseYear - 3) + 1)) +
      (releaseYear - 3);
    if (!possible_dates.includes(option)) {
      possible_dates.push(option);
    }
  }
  document.getElementById("base-timer-label").innerText = "01:00";
  let header = document.querySelector("header");
  let bonus = document.createElement("div");
  bonus.setAttribute("id", "bonus");
  document.body.insertBefore(bonus, header);
  let bonusLevel = `
    <div id="overlay">
        <div class="modal">
            <h2>Bonus Question</h2>
            <h3>When did <span>${artist}</span> released <span>${title}</span>?</h3>
            <div class="button-container">
                <button class="bonus-btn">${addAPossibleYear(possible_dates)}</button>
                <button class="bonus-btn">${addAPossibleYear(possible_dates)}</button>
                <button class="bonus-btn">${addAPossibleYear(possible_dates)}</button>
                <button class="bonus-btn">${addAPossibleYear(possible_dates)}</button>
            </div>
            <div id="bonus-timer"><span>${formatTime(bonusCount)}</span></div>
        </div>
    </div>`;
  bonus.innerHTML = bonusLevel;

  startBonusInterval();
}

/**
 * returns a possible year from the possible dates array and mutates the array
 */
function addAPossibleYear(arr) {
  let length = arr.length;
  let index = Math.floor(Math.random() * length);
  let year = arr[index];
  arr.splice(index, 1);
  return year;
}

/**
 * starts the countdown for the bonus
*/
function startBonusInterval(){
    let releaseYear = currentSong.release_year;
    bonusTimerInterval = setInterval(()=>{
        bonusCount -=1
        document.querySelector("#bonus-timer span").innerHTML = formatTime(bonusCount);

        if(bonusCount === 0){
            loseBonus(releaseYear)
        }
    }, 1000)
}

// Checks if the button pressed is correct
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("bonus-btn")) {
    let releaseYear = currentSong.release_year;
    if (e.target.innerHTML === releaseYear) {
      winBonus(releaseYear);
    } else {
      loseBonus(releaseYear);
    }
  }
});

/**
 * Function when the bonus is won
 */
function winBonus(releaseYear) {
  let buttons = Array.from(document.getElementsByClassName("bonus-btn"));
  buttons.forEach((btn) => {
    if (btn.innerHTML === releaseYear) {
      btn.classList.add("correct");
    }
  });
  //increments the score by 10 (base 50 + -40)
  incrementScore(-40);

  clearBonus();
}

/**
 * Function when the bonus is lost
 */
function loseBonus(releaseYear) {
  let buttons = Array.from(document.getElementsByClassName("bonus-btn"));
  buttons.forEach((btn) => {
    if (btn.innerHTML === releaseYear) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  });

  clearBonus();
}

/**
 * Function to clear the bonus and call the next song
 */
function clearBonus() {
  bonusCount = 15;
  clearInterval(bonusTimerInterval);
  clearInterval(timerInterval);
  setTimeout(() => {
    document.getElementById("bonus").remove();
    getSong();
  }, 2000);
}

let songInput = document.getElementById("user-song");

// Event Listener to Get user answer
songInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.getElementById("user-answer");
  let answer = input.value;
  input.value = "";
  checkAnswer(answer);
});

/**
 * Function to compare user answer.
 * Gets new song on correct guess.
 * Decreases lives on incorrect guess.
 */
function checkAnswer(answer) {
  // Strip special characters from answers
  const stripAns = answer.replace(/[^a-z0-9]/gi, "").toLowerCase();
  let actualAns = currentSong.title.toLowerCase();
  actualAns = actualAns.replace(/[^a-z0-9]/gi, "");

  if (stripAns === actualAns) {
    incrementScore(timeLeft);
    clearInterval(timerInterval);
    timePassed = 0;
    bonusQuestion();
    songNumber++;
    updateQuestionCounter();
  } else {
    wrongInputOrTimesUp();
  }
}

/**
 * Function to update question counter
 */
const updateQuestionCounter = () => {
  document.getElementById(
    "q-counter"
  ).innerHTML = `Song ${songNumber} out of ${totalSongs}`;
};

/**
 * Function when times is up or user enter wrong input
 */
function wrongInputOrTimesUp() {
  timePassed = 0;
  removeLife();
  clearInterval(timerInterval);
  getSong();
}

/**
 * Function to removeLife
 */
const removeLife = () => {
  livesLeft -= 1;
  let lives = document.getElementsByClassName("life");
  if (livesLeft === 2) {
    lives[1].src = `assets/images/skull-red.svg`;
  } else if (livesLeft == 1) {
    lives[2].src = `assets/images/skull-red.svg`;
  } else {
    window.location.href = "scoreboard.html";
  }
  songNumber++;
  updateQuestionCounter();
};

/**
 * Function to increment score
 * @param {int} score
 */
const incrementScore = (score) => {
  let currentScore = parseInt(document.getElementById("score").innerHTML);
  //ads 50 points per question + one second per extra second
  currentScore += 50 + score;
  document.getElementById("score").innerHTML = currentScore;
  localStorage.score = currentScore;
};

// Event Listener to get songs on initial page load
window.addEventListener("load", () => {
  songs = loadAllSongs();
  // initialise score to 0
  localStorage.score = 0;
});
