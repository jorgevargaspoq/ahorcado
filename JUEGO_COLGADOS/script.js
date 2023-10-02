const words = ['ZEUS', 'POSEIDON', 'HERA', 'ATHENA', 'APOLLO', 'HERMES', 'ARTEMIS'];
let currentWord;
let guessedLetters;
let hangmanStep = 0;

const hangmanSteps = [
    'a1.png', 'a2.png', 'a3.png', 'a4.png', 'a5.png', 'a6.png', 'a7.png'
  ];
  


const wordToGuessElement = document.getElementById('word-to-guess');
const hangmanStepsElement = document.getElementById('hangman-steps');
const gameOverMessageElement = document.getElementById('game-over-message');
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', resetGame);

function initGame() {
  hangmanStep = 0;
  guessedLetters = new Set();
  currentWord = words[Math.floor(Math.random() * words.length)];

  displayWordToGuess();
  displayHangmanStep();
}

function displayWordToGuess() {
  const displayedWord = currentWord.split('').map(letter => (guessedLetters.has(letter) ? letter : '_')).join(' ');
  wordToGuessElement.textContent = displayedWord;
}

function displayHangmanStep() {
  hangmanStepsElement.innerHTML = `<img src="images/${hangmanSteps[hangmanStep]}" alt="Hangman step ${hangmanStep}" />`;
}


function guessLetter(letter) {
  guessedLetters.add(letter.toUpperCase());

  if (!currentWord.includes(letter.toUpperCase())) {
    hangmanStep++;
  }

  displayWordToGuess();
  displayHangmanStep();

  if (hangmanStep === hangmanSteps.length - 1) {
    gameOverMessageElement.textContent = 'Perdiste. La palabra era: ' + currentWord;
  }

  if (!wordToGuessElement.textContent.includes('_')) {
    gameOverMessageElement.textContent = '¡Ganaste!';
  }
}

function resetGame() {
  gameOverMessageElement.textContent = '';
  initGame();
}

document.addEventListener('keydown', event => {
  const key = event.key.toUpperCase();
  const regex = /^[A-Z]$/;
  
  if (regex.test(key) && !guessedLetters.has(key)) {
    guessLetter(key);
  }
});

initGame();
