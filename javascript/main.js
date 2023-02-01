// GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

const splashScreenDOM = document.querySelector("#splash-screen");
const gameoverScreenDOM = document.querySelector("#gameover-screen");
const winnerScreenDOM = document.querySelector("#winner-screen");

const playBtnDOM = document.querySelector("#play-btn");
const tryAgainBtnDOM = document.querySelector("#restart-btn");
const playAgainBtnDOM = document.querySelector("#playagain-btn");

const scoreDOM = document.querySelector("h1");
let game;

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  //1. Quitar la splash-screen
  splashScreenDOM.style.display = "none";
  gameoverScreenDOM.style.display = "none";
  winnerScreenDOM.style.display = "none";

  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scoreDOM.style.display = "block";
  //2. Iniciar juego
  game = new Game();

  //3. Crear un objeto clase Game
  game.gameLoop();
};

//ADD EVENT LISTENERS
playBtnDOM.addEventListener("click", startGame);
tryAgainBtnDOM.addEventListener("click", startGame);
playAgainBtnDOM.addEventListener("click", startGame);

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    game.spaceShip.spaceShipUp();
  } else if (event.code === "ArrowDown") {
    game.spaceShip.spaceShipDown();
  }

  if (event.code === "ArrowRight") {
    game.spaceShip.spaceShipRight();
  } else if (event.code === "ArrowLeft") {
    game.spaceShip.spaceShipLeft();
  }

  if (event.code === "Space") {
    game.shoot();
  }
});
