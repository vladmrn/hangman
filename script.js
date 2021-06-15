var word;

var input = document.getElementById("inputWord");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submitWord").click();
  }
});

function startGame() {
    if (input.value.length > 2) {
        $(".spacer").css("visibility", "hidden");
        $(".alphabet").css("visibility", "visible");
        $(".letterInputDiv").css("visibility", "visible");
        $("#canvas").css("visibility", "visible");
        createLetterBox();
    } else {
        document.getElementById("wordToShort").style.visibility = "visible";
        document.getElementById("inputWord").placeholder="Insert a word";//aici trebuie sa mai lucrez.
    }
}

function createLetterBox() {
    word = document.getElementById("inputWord").value.toUpperCase();
    if (!/[^a-zA-Z]/.test(word)) {  //aici mai trebuie lucrat.
        word.split('').forEach(function addLetterBox(letter, i) {
            var new_button = document.createElement("button");
            const currentDiv = document.getElementById("letterInputDiv");
            currentDiv.insertAdjacentElement("afterbegin", new_button);
            new_button.className = "letterBox";
            new_button.id = word.length - i - 1;
        });
    } else {
        document.getElementById("itSNotWord").style.visibility = "visible";
    }
    
}

let dpi = window.devicePixelRatio;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// Set display size (css pixels).
var size = 400;
canvas.style.width = size + "px";
canvas.style.height = size + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio;
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

// Drawing methods.
function drawFirstMistake() {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(90, 365);
    ctx.lineTo(90, 45);
    ctx.stroke();
}

function drawSecondMistake() {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(86, 45);
    ctx.lineTo(180, 45);
    ctx.stroke();
}

function drawThirdMistake() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 41);
    ctx.lineTo(180, 143);
    ctx.stroke();
    ctx.ellipse(178, 147, 3, 7, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawFourthMistake() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(177, 137, 13, 0, 2 * Math.PI);
    ctx.moveTo(177, 150);
    ctx.lineTo(177, 250);
    ctx.lineTo(200, 300);
    ctx.lineTo(177, 250);
    ctx.lineTo(154, 300);
    ctx.moveTo(177, 170);
    ctx.lineTo(177, 170);
    ctx.lineTo(154, 215);
    ctx.moveTo(177, 170);
    ctx.lineTo(177, 170);
    ctx.lineTo(200, 215);
    ctx.stroke();
}

//Sound On.
var mutePage = true;
function unmutePage() {
    mutePage = false;
    document.getElementById("mute-btn").style.visibility = 'hidden';
}

// Check the letters.
var counterGuessedWords = 0, counterMistakes = 0;
function checkLetters(inputLetter) {
    var correctGuess = false;
    var audioCorrect = new Audio("sounds/correct.mp3");
    var audioError = new Audio("sounds/error.mp3");
    var audioLoser = new Audio("sounds/loser.mp3");
    var audioVictory = new Audio("sounds/victory.mp3");
    word.split('').forEach(function checkInput(letter, index) {
        if (inputLetter === letter) {
            correctGuess = true;
            document.getElementById(index).textContent = inputLetter;
            document.getElementById(letter).style.visibility = 'hidden';
            if (mutePage == false) {
                audioCorrect.play();
            }
            ++counterGuessedWords;
            if (counterGuessedWords === word.length) {
                document.getElementById("guessTheWord").innerHTML = "Congratulations!!!";
                $('.alphabet').attr('disabled', 'disabled');
                if (mutePage == false) {
                    audioVictory.play();
                }
                $("#refreshPage").css("visibility", "visible");
            }
        }
    });
    if (correctGuess === false) {
        document.getElementById(inputLetter).style.visibility = 'hidden';
        if (mutePage == false) {
            audioError.play();
        }
        if (inputLetter != "A" && inputLetter != "E" && inputLetter != "I" && inputLetter != "O" && inputLetter != "U") {
            ++counterMistakes;
            if (counterMistakes === 1) {
                drawFirstMistake();
            }
            if (counterMistakes === 2) {
                drawSecondMistake();
            }
            if (counterMistakes === 3) {
                drawThirdMistake();
            }
            if (counterMistakes === 4) {
                drawFourthMistake();
                document.getElementById("guessTheWord").innerHTML = "Sorry, u dead.";
                if (mutePage == false) {
                    audioLoser.play();
                }
                $("#refreshPage").css("visibility", "visible");
                $('.alphabet').attr('disabled', 'disabled');
            }
        }
    }
}

function refreshPage() {
    window.location.reload();
}

