class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroidArr = [];
    this.frames = 1;
    this.isGameOn = true;
    this.score = 0;
    this.scoreDOM = document.querySelector("h1 span");
    this.scoreDOM.innerHTML = 0;

    //this.laserBeam;

    //colisiones nave-asteroides y láser-asteroides
  }

  //MÉTODOS
  gameOver = () => {
    this.isGameOn = false;

    //ocultar canvas
    canvas.style.display = "none";

    //mostrar pantalla final
    gameoverScreenDOM.style.display = "flex";
  };

  checkCollision = () => {
    //revisa las colisiones entre los elementos
    this.asteroidArr.forEach((eachAsteroid) => {
      if (
        eachAsteroid.x < this.spaceShip.x + this.spaceShip.w &&
        eachAsteroid.x + eachAsteroid.w > this.spaceShip.x &&
        eachAsteroid.y < this.spaceShip.y + this.spaceShip.h &&
        eachAsteroid.h + eachAsteroid.y > this.spaceShip.y
      ) {
        this.gameOver();
      }
    });
  };

  checkCanvasCollision = () => {
    if (
      this.spaceShip.y + this.spaceShip.h > canvas.height ||
      this.spaceShip.y < 0
    ) {
      this.gameOver();
    }
  };

  flyingAsteroids = () => {
    //loop con condiciones randomizadas para spawnear asteroides
    if (this.asteroidArr.length === 0 || this.frames % 60 === 0) {
      let randomPosY = Math.random() * 500;
      let asteroid = new Asteroid(
        randomPosY,
        Math.random() * 5, // speed
        Math.round(Math.random()) === 0 // color
      );
      this.asteroidArr.push(asteroid);
    }
  };

  removeAsteroids = () => {
    const firstAsteroid = this.asteroidArr[0];
    if (firstAsteroid.x < 0) {
      console.log(this.score, firstAsteroid.x + 60);
      this.asteroidArr.shift();
      this.score++;
      this.scoreDOM.innerHTML = this.score;
    }
  };

  drawBg = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };
  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  gameLoop = () => {
    this.frames++;
    //1. Limpiar el canvas
    this.clearCanvas();

    //2. Acciones
    this.flyingAsteroids();
    this.asteroidArr.forEach((eachAsteroid) => {
      eachAsteroid.movingAsteroid();
    });
    this.checkCanvasCollision();
    this.checkCollision();
    this.removeAsteroids();

    //3. Dibujado
    this.drawBg();
    this.spaceShip.drawSpaceShip();
    this.asteroidArr.forEach((eachAsteroid) => {
      eachAsteroid.drawAsteroid();
    });

    //4. Recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
