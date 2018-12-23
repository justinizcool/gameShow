const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btnReset = document.querySelector('.btn__reset');
const ul = document.querySelector('#phrase');
const buttons = document.querySelectorAll('.keyrow button');
const overlay = document.querySelector('#overlay').parentNode;
const header = document.querySelector('.header');
let missed = 0;

// Array of Phrases
const phrases = [
                "I live for the nights that I cant remember, with the people that I wont forget", 
                "good morning", 
                "wassup gangster",
                "thats what she said",
                "i got my mind on my money and my money on my mind"
                ];

// Start Game
btnReset.addEventListener('click', () => {
  document.querySelector('#overlay').style.display = 'none';
  addPhraseToDisplay(phraseArray);
});

// Get a random phrase from phrases arr
const getRandomPhraseArray = (arr) => {
  let randomNum = Math.floor((Math.random() * 5));
  let phrase = arr[randomNum].split('');
  // returns an array of characters
  return phrase;
};

// Array of characters (["I", " ", "l", "i", "k", "e", " ", "y", "o", "u"])
const phraseArray = getRandomPhraseArray(phrases);

// Add phrase to display
const addPhraseToDisplay = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    let letter = arr[i];
    li.appendChild(document.createTextNode(letter));
    if(letter !== " "){
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
    ul.appendChild(li);
  };
};

const loseLife = () => {
  missed += 1;
  const hearts = document.querySelectorAll('.tries img');
  const heart = hearts[hearts.length-missed];
  const url = "images/lostHeart.png";
  heart.setAttribute('src', url);
  if(missed === 5) {
    overlay.classList.add('lose');
    header.textContent = "YOU LOSE";
  };
};

const checkWin = () => {
  const allCheckLetters = document.querySelectorAll('.letter');
  const allShowLetters = document.querySelectorAll('.show');
  overlay.classList.remove('start');
  if(allCheckLetters.length === allShowLetters.length) {
    overlay.classList.add('win');
    header.textContent = "YOU WIN!";
  };
};


// Check if input is correct letter and reveals letter
const checkLetter = (guess) => {
  // if input of ele of class "letter" is correct add 'show' class to <li> store and return letter
  let foundLetter = false;
  const checkLetters = document.querySelectorAll('.letter');
  const showLetter = document.querySelectorAll('.show');
  for(let i = 0; i < checkLetters.length; i++) {
    if(checkLetters[i].textContent === guess) {
      foundLetter = true;
      checkLetters[i].classList.add('show');
    };
  };
  if(foundLetter) {
    return guess;
  } else {
    return null;
  };
};

// Keyboard events
keyboard.addEventListener('click', (e) => {
  let letterFound;
  let selection = e.target;
  if(e.target.tagName === "BUTTON") {
    let guess = selection.textContent;
    checkLetter(guess);
    if(guess === checkLetter(guess)){
      letterFound = checkLetter(guess);
      selection.classList.add('chosen');
      selection.setAttribute('disabled', true);
      checkWin();
    } else {
      selection.classList.add('chosen');
      selection.setAttribute('disabled', true);
      loseLife();
    };
  };
});


