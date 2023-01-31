class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.h = 9;
    this.w = 54;

    this.speed = 8;
    this.image = new Image();
    this.image.src = "./images/laser.png";
  }
  //MÉTODOS
  drawLaser = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  //propiedades del láser
  shoot = () => {
    this.x += this.speed;
  };
}
