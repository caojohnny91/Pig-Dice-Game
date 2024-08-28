"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
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

let totalScores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  // set game variables
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // set all scores back to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // remove/add class from players
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player1El.classList.remove("player--active");

  player0El.classList.add("player--active");

  diceImg.classList.add("hidden");

  rollDiceBtn.classList.remove("hidden");
  holdBtn.classList.remove("hidden");

  // set player names back to original
  player0Name.textContent = "Player 1";
  player1Name.textContent = "Player 2";
};

init();

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

rollDiceBtn.addEventListener("click", function () {
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
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    // Add current score to the active player's score
    totalScores[activePlayer] += currentScore; // activePlayer = 0 or 1 which corresponds to idx, so totalScores[0] or totalScores[1]
    // totalScores[1] = totalScores + currentScore

    // dynamically change the #score--0 or 1.textContent with the totalScore count
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      playing = false;

      // add player--winner class to implement winner CSS
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

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

// New Game Reset Btn
newGameBtn.addEventListener("click", init);

// Modal Window
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
  if (event.key === "Escape") {
    closeModal();
  }
});
