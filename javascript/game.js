class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroidArr = [];
    this.laserArr = [];

    this.frames = 1;
    this.isGameOn = true;

    this.score = 0;
    this.scoreDOM = document.querySelector("h1 span");
    this.scoreDOM.innerHTML = 0;

    this.music = document.createElement("audio");
    this.music.src = "./sounds/Soundtrack cut.mp3";
    this.music.volume = 0.1;
    this.music.loop = true;
    this.music.play();

    this.blaster = document.createElement("audio");
    this.blaster.src = "./sounds/blaster.mp3";
    this.blaster.volume = 0.02;

    this.sentence = document.createElement("audio");
    this.sentence.src = "./sounds/This is why I hate Flying (cut).mp3";
    this.sentence.volume = 0.1;
  }

  //MÉTODOS

  gameOver = () => {
    this.isGameOn = false;
    this.sentence.play();
    this.music.pause();

    //ocultar canvas
    canvas.style.display = "none";

    //mostrar pantalla final
    gameoverScreenDOM.style.display = "flex";
  };

  checkCollision = () => {
    //colisiones entre asteroides y la nave
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

  checkLaserCollision = () => {
    //colisiones entre asteroides y el láser
    this.laserArr.forEach((eachLaser, i) => {
      this.asteroidArr.forEach((eachAsteroid, j) => {
        if (
          eachLaser.x + eachLaser.w > eachAsteroid.x &&
          eachLaser.y > eachAsteroid.y &&
          eachLaser.y < eachAsteroid.y + eachAsteroid.h
        ) {
          this.laserArr.splice(i, 1);
          this.asteroidArr.splice(j, 1);
          this.score++;
          this.scoreDOM.innerHTML = this.score;
        }
      });
    });
  };

  shoot = () => {
    this.blaster.currentTime = 0;
    let x = this.spaceShip.x;
    let y = this.spaceShip.y + this.spaceShip.h / 2;
    let laser = new Laser(x, y);
    this.laserArr.push(laser);
    this.blaster.play();
  };

  flyingAsteroids = () => {
    //loop con condiciones randomizadas para spawnear asteroides
    if (this.asteroidArr.length === 0 || this.frames % 60 === 0) {
      let speed = Math.random() * 5 + 2;
      if (this.score >= 30) {
        speed += 2;
      } else if (this.score >= 60) {
        speed += 4;
      }
      let randomPosY = Math.random() * 500;
      let asteroid = new Asteroid(
        randomPosY,
        speed, // speed
        Math.round(Math.random()) === 0 // color
      );
      this.asteroidArr.push(asteroid);
    }
  };

  removeAsteroids = (index) => {
    this.asteroidArr.forEach((eachAsteroid, index) => {
      if (eachAsteroid.x + eachAsteroid.w < 0) {
        this.asteroidArr.splice(index, 1);
      }
    });
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
    this.laserArr.forEach((eachLaser) => {
      eachLaser.movingLaser();
    });
    this.checkCanvasCollision();
    this.checkCollision();
    this.checkLaserCollision();
    this.removeAsteroids();

    //3. Dibujado
    this.drawBg();
    this.spaceShip.drawSpaceShip();
    this.asteroidArr.forEach((eachAsteroid) => {
      eachAsteroid.drawAsteroid();
    });
    this.laserArr.forEach((eachLaser) => {
      eachLaser.drawLaser();
    });

    //4. Recursión
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
