class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroidArr = [];
    this.frames = 1;

    //this.laserBeam;

    //colisiones nave-asteroides y láser-asteroides

    //al colisionar: gameover
  }

  //MÉTODOS
  flyingAsteroids = () => {
    if (this.asteroidArr.length === 0 || this.frames % 60 === 0) {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          let randomPosY = Math.random() * 500;
          let asteroid = new Asteroid(
            randomPosY,
            Math.random() * 3 + 2, // speed
            Math.round(Math.random()) === 0 // color
          );
          this.asteroidArr.push(asteroid);
        }, i * 1000); // frequency
      }
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
    //3. Dibujado
    this.drawBg();
    this.spaceShip.drawSpaceShip();
    this.asteroidArr.forEach((eachAsteroid) => {
      eachAsteroid.drawAsteroid();
    });

    //4. Recursión
    requestAnimationFrame(this.gameLoop);
  };
}
