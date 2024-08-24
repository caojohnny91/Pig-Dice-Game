"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // another way to select element Id instead of querySelector, and dont need #
const diceImg = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".btn--roll");
const curent0El = document.querySelector("#current--0");
const curent1El = document.querySelector("#current--1");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceImg.classList.add("hidden");

const totalScores = [0, 0]; // beginning total scores of each player, player--0 (player 1) is at idx 0 and player--1 (player 2) is at idx 1
let currentScore = 0;
let activePlayer = 0; // Player 1 is player--0 to start

// Create event when Roll Dice button is clicked
// Generate random number from 1-6 and make corresponding dice img appear
rollDiceBtn.addEventListener("click", function () {
  // generate number 1-6 number
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(diceNumber);

  // dynamically set diceNumber to img src
  diceImg.src = `dice-${diceNumber}.png`;
  // remove hidden class to reveal img
  diceImg.classList.remove("hidden");

  if (diceNumber !== 1) {
    // add dice to current score
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore; // dynamically connecting the active player 0 or 1 to their currentScore
  } else {
    // switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
});
