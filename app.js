/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-value'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message')

//Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

//play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value)
  console.log(guess)
  //Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }
  //check if won
  else if (guess === winningNum) {
    //game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!!`)
  } else {
    //Wrong number
    guessesLeft -= 1
    if (guessesLeft === 0) {
      //game over - lost
      gameOver(
        false,
        `Game over, you lost, the correct number is ${winningNum}`
      )
    } else {
      //games continues - answer
      //change border color
      guessInput.style.borderColor = 'red'
      //clear Input
      guessInput.value = ''
      //tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
})

//Game over
function gameOver(won, msg) {
  let Color
  won === true ? (Color = 'green') : (Color = 'red')
  //Disable input
  guessInput.disabled = true
  //change border color
  guessInput.style.borderColor = Color
  message.style.color = Color
  //set message
  setMessage(msg)

  //Play again?
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again'
}

//Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Set message
function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}
