class Game {
  //PROPIEDADES
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/bg-space.png";
    this.spaceShip = new SpaceShip();
    this.asteroid;
    //this.laserBeam;

    //colisiones nave-asteroides y láser-asteroides

    //al colisionar: gameover
  }

  //MÉTODOS
  gameLoop = () => {
    //1. Limpiar el canvas
    //2. Acciones
    //3. Dibujado
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.spaceShip.image,
      this.spaceShip.x,
      this.spaceShip.y,
      this.spaceShip.w,
      this.spaceShip.h
    );

    //4. Recursión
    requestAnimationFrame(this.gameLoop);
  };
}
