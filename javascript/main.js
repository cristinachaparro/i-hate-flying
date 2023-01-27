// GLOBAL VARIABLES
const playBtnDOM = document.querySelector("#play-btn");
const canvas = document.querySelector("#my-canvas");
const splashScreenDOM = document.querySelector("#splash-screen");
const ctx = canvas.getContext("2d");

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  //1. Quitar la splash-screen
  splashScreenDOM.style.display = "none";
  canvas.style.display = "block";
  //2. Iniciar juego
  const game = new Game();

  //3. Crear un objeto clase Game
  game.gameLoop();
};

//ADD EVENT LISTENERS
playBtnDOM.addEventListener("click", startGame);
