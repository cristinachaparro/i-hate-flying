class Asteroid {
  constructor() {
    this.x = 70;
    this.y = 70;
    this.h = 60;
    this.w = 60;

    this.speed = 4;
    this.image = new Image();
    this.image.src = "./images/asteroid1.png";
  }
  //MÉTODOS
  drawAsteroid = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  //propiedades de los asteroides
  //que los asteroides avancen
  movingAsteroid = () => {
    this.x += this.speed;
  };

  //que los asteroides desaparezcan
}
