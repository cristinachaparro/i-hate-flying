class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroidArr = [];
    this.frames = 1;
    this.isGameOn = true;

    //this.laserBeam;

    //colisiones nave-asteroides y láser-asteroides

    //al colisionar: gameover
  }

  //MÉTODOS
  gameover = () => {
    this.isGameOn = false;
  };

  checkCollision = () => {
    this.asteroidArr.forEach((eachAsteroid) => {
      if (
        eachAsteroid.x < this.spaceShip.x + this.spaceShip.w &&
        eachAsteroid.x + eachAsteroid.w > this.spaceShip.x &&
        eachAsteroid.y < this.spaceShip.y + this.spaceShip.h &&
        eachAsteroid.h + eachAsteroid.y > this.spaceShip.y
      ) {
        this.gameover();
      }
    });
  };

  flyingAsteroids = () => {
    //loop con condiciones randomizadas para spawnear asteroides
    if (this.asteroidArr.length === 0 || this.frames % 60 === 0) {
      for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          let randomPosY = Math.random() * 500;
          let asteroid = new Asteroid(
            randomPosY,
            Math.random() * 5, // speed
            Math.round(Math.random()) === 0 // color
          );
          this.asteroidArr.push(asteroid);
        }, i * 1000); // frecuencia de spawneo
      }
    }
  };

  removeAsteroids = () => {
    if (this.asteroidArr[0] < 0) {
      this.asteroidArr.shift();
    }
  };

  drawBg = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };
  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  gameLoop = () => {
    //1. Limpiar el canvas
    this.clearCanvas();

    //2. Acciones
    this.flyingAsteroids();
    this.asteroidArr.forEach((eachAsteroid) => {
      eachAsteroid.movingAsteroid();
    });
    this.removeAsteroids();
    this.checkCollision();

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
