// GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

const splashScreenDOM = document.querySelector("#splash-screen");
const gameoverScreenDOM = document.querySelector("#gameover-screen");
const winnerScreenDOM = document.querySelector("#winner-screen");
const storyScreenDOM = document.querySelector("#story-screen");

const playBtnDOM = document.querySelector("#play-btn");
const tryAgainBtnDOM = document.querySelector("#restart-btn");
const playAgainBtnDOM = document.querySelector("#playagain-btn");
const skipVideoBtnDOM = document.querySelector("#skip-video-btn");

const scoreDOM = document.querySelector("#game-stats");
let game;

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  gameoverScreenDOM.style.display = "none";
  winnerScreenDOM.style.display = "none";

  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  scoreDOM.style.display = "flex";
  //2. Iniciar juego
  game = new Game();

  //3. Crear un objeto clase Game
  game.gameLoop();
};

const startWithIntro = () => {
  //1. Quitar la splash-screen
  splashScreenDOM.style.display = "none";

  // 2. Story (vídeo) screen
  storyScreenDOM.style.display = "flex";
  const video = document.createElement("video");
  video.height = window.innerHeight;
  video.width = window.innerWidth;
  video.autoplay = true;
  video.src = "./video/storyscreen.mp4";
  video.volume = 0.1;
  video.defaultPlaybackRate = 1.5;
  video.load();
  storyScreenDOM.appendChild(video);

  // 3. Cuando acaba el vídeo

  const timeout = setTimeout(() => {
    storyScreenDOM.style.display = "none";
    startGame();
  }, 58666);

  const skipVideo = () => {
    clearTimeout(timeout);
    video.pause();
    storyScreenDOM.style.display = "none";
    startGame();
  };

  skipVideoBtnDOM.addEventListener("click", skipVideo);
};

//ADD EVENT LISTENERS
playBtnDOM.addEventListener("click", startWithIntro);
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
