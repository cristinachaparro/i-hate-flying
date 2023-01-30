class SpaceShip {
  constructor() {
    //propiedades de la nave
    this.x = 100;
    this.y = 230;
    this.h = 50;
    this.w = 50;

    this.jumpSpeed = 20;
    this.image = new Image();
    this.image.src = "./images/spaceship.png";
    this.image.style = {
      transform: "rotate(90deg)",
    };
  }

  //MÉTODOS
  drawSpaceShip = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  spaceShipUp = () => {
    this.y -= this.jumpSpeed;
  };

  spaceShipDown = () => {
    this.y += this.jumpSpeed;
  };
}
