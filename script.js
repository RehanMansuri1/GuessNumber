const submit = document.querySelector('#submit');
const guesses = document.querySelector('.guesses');
const remaining = document.querySelector('.remaining');
const bigSmaill = document.querySelector('.bigSmaill');
const start = document.querySelector('.resultparas');

const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;
let randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const userInput = parseInt(document.querySelector('#guessfield').value);
        console.log(userInput);
        validateGuess(userInput);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    }
    else if (guess < 0 || guess > 9) {
        alert('Please enter a number between 0 and 9');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame(); // Call the endGame function when the game is over
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('You guessed it right');
        if (randomNumber <= 4) {
            displayMessage('Number is small');
        } else {
            displayMessage('Number is big');
        }
    } else {
        displayMessage('You guessed it wrong');
    }
}

function displayGuess(guess) {
    document.querySelector('#guessfield').value = ''; // Clear the input field after each guess
    guesses.innerHTML += `${guess} , `;
    numGuess++;
    remaining.innerHTML = `${10 - numGuess}`;
}

function displayMessage(message) {
    bigSmaill.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    const userInput = document.querySelector('#guessfield'); // Corrected here
    userInput.value = ''; // Clear the input field
    userInput.setAttribute('disabled', ''); // Disable the input field
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start a new Game</h2>`;
    p.style.cursor ='pointer'
    start.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){ // Corrected 'clicl' to 'click'
        randomNumber = Math.floor(Math.random() * 10);
        prevGuess = [];
        numGuess = 1;
        guesses.innerHTML = '';
        remaining.innerHTML = `${10 - numGuess}`;
        const userInput = document.querySelector('#guessfield');
        userInput.removeAttribute('disabled');
        start.removeChild(p);
        playGame = true;
    });
}
