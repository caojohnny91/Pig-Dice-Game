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
let currentScore = 0;

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
    currentScore += diceNumber;
    curent0El.textContent = `${currentScore}`;
  } else {
    curent0El.textContent = "0";
  }
});
