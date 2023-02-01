class ExtraLife {
  constructor(yPos) {
    this.x = canvas.width;
    this.y = yPos;
    this.h = 35;
    this.w = 35;

    this.speed = 8;
    this.image = new Image();
    this.image.src = "./images/spaceLives.png";
  }
  //MÉTODOS
  drawExtraLife = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  //propiedades de los asteroides
  movingExtraLife = () => {
    this.x -= this.speed;
  };
}
