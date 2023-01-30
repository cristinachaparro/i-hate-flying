class Asteroid {
  constructor(yPos, speed, isAsteroidBrown) {
    this.x = canvas.width;
    this.y = yPos;
    this.h = 60;
    this.w = 60;

    this.speed = speed;
    this.image = new Image();
    if (isAsteroidBrown === true) {
      this.image.src = "./images/asteroid1.png";
    } else {
      this.image.src = "./images/asteroid2.png";
    }
  }
  //MÉTODOS
  drawAsteroid = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  //propiedades de los asteroides
  movingAsteroid = () => {
    this.x -= this.speed;
  };
}
