let score = "test2";
let username = "test";
let unique = toString(Date());


let scoreboard = [score, username];
localStorage.setItem(unique, scoreboard);

console.log(localStorage.getItem("datetime"));
console.log(localStorage.getItem("datetime"));
console.log(localStorage.length);




let score = localStorage.score;
let username = localStorage.name;
let unique = toString(Date());

let scoreboard = [];

function getScoreboard() {
    let currentLength = localStorage.length;
    let tempBoard = [];
    let i = 0;
    while (i < currentLength) {
        
    }
}