"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // another way to select element Id instead of querySelector, and dont need #
const diceImg = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".btn--roll");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const holdBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
const player0Name = document.getElementById("name--0");
const player1Name = document.getElementById("name--1");
const instructionsBtn = document.querySelector(".btn--instructions");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");

// for scoping need to declare these variables outside of init() and the reassign later
let totalScores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  totalScores = [0, 0]; // beginning total scores of each player, player--0 (player 1) is at idx 0 and player--1 (player 2) is at idx 1

  currentScore = 0;
  activePlayer = 0; // Player 1 is player--0 to start

  // create boolean variable that holds the game state
  playing = true;

  // set all scores back to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // remove player--winner class from both players
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // remove player--active class only from player 1 (player 0 should be active)
  player1El.classList.remove("player--active");

  // add player--active class to player 0
  player0El.classList.add("player--active");

  // make diceImg hidden
  diceImg.classList.add("hidden");

  // make btns seen
  rollDiceBtn.classList.remove("hidden");
  holdBtn.classList.remove("hidden");

  // set player names back to original
  player0Name.textContent = "Player 1";
  player1Name.textContent = "Player 2";
};

init(); // need to call this function and game to work

// create DRY switchPlayer function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // reset the new activePlayer's score counter to 0
  currentScore = 0;
  // toggle method of player--active class: it will add the class if its not there, or remove the class if it is there!
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Create event when Roll Dice button is clicked
// Generate random number from 1-6 and make corresponding dice img appear
rollDiceBtn.addEventListener("click", function () {
  // add new playing state
  if (playing) {
    // generate number 1-6 number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    // dynamically set diceNumber to img src
    diceImg.src = `assets/dice-${diceNumber}.png`;
    // remove hidden class to reveal img
    diceImg.classList.remove("hidden");

    if (diceNumber !== 1) {
      // add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // dynamically connecting the active player 0 or 1 to their currentScore
    } else {
      switchPlayer(); // this new function replaces the below code
      // set the activePlayer's current score to 0
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // // switch to next player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // // reset the new activePlayer's score counter to 0
      // currentScore = 0;
      // // toggle method of player--active class: it will add the class if its not there, or remove the class if it is there!
      // player0El.classList.toggle("player--active");
      // player1El.classList.toggle("player--active");
    }
  }
});

// implement Hold Button
holdBtn.addEventListener("click", function () {
  // add new playing state
  if (playing) {
    // Add current score to the active player's score
    totalScores[activePlayer] += currentScore; // activePlayer = 0 or 1 which corresponds to idx, so totalScores[0] or totalScores[1]
    // totalScores[1] = totalScores + currentScore

    // dynamically change the #score--0 or 1.textContent with the totalScore count
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // check is player's score is >= 100
    if (totalScores[activePlayer] >= 100) {
      // finish the game
      // set playing to false to deactivate the above logic in rollDiceBtn and holdBtn
      playing = false;

      // add player--winner class to implement winner CSS
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      // Update Winning Player's title
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } is the Winner! 🥳 🎉`;

      // remove player--active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      // remove dice img and btns
      diceImg.classList.add("hidden");
      rollDiceBtn.classList.add("hidden");
      holdBtn.classList.add("hidden");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// call init function to reset as soon as the user clicks on the button
newGameBtn.addEventListener("click", init);

instructionsBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", function () {
  closeModal();
});

overlay.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key === "Escape") {
    console.log("Escape Key Pressed");

    closeModal();
  }
});
