class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroidArr = [];
    this.frames = 1;
    this.asteroidSeparation = 250;

    //this.laserBeam;

    //colisiones nave-asteroides y láser-asteroides

    //al colisionar: gameover
  }

  //MÉTODOS
  flyingAsteroids = () => {
    if (this.asteroidArr.length === 0 || this.frames % 120 === 0) {
      let randomPosY = Math.random() * -100;

      let asteroid = new Asteroid(randomPosY, true);
      this.asteroidArr.push(asteroid);
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
