"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // another way to select element Id instead of querySelector, and dont need #
const diceImg = document.querySelector(".dice");

// set initial game set up
score0El.textContent = 0;
score1El.textContent = 0;
diceImg.classList.add("hidden");
