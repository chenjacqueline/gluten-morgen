class Background {
  constructor() {
    this.bgY = 0;
    this.images = [
      {
        src: loadImage("assets/bg-back.png"),
        x: 0,
        speed: 4.5
      },
      {
        src: loadImage("assets/bg-front.png"),
        x: 0,
        speed: 5
      }
    ];
  }

  move(img) {
    //image
    // (target the image property in the object, then the x coordinate, Y remains constant)
    image(img.src, img.x, this.bgY);
    image(img.src, img.x + width, this.bgY);

    img.x -= img.speed;
    if (img.x <= -width) {
      img.x = 0;
    }
  }

  // Note: This has nothing to do with the p5 draw(), just a relevant name for the method:
  draw() {
    // If you don't see a "this." in front, we're probably referring to a P5 function:
    const c = color(246, 242, 236);
    background(c); // P5 background function

    // Looping through the this.images array of objects in the Background constructor 60x/s
    for (let i = 0; i < this.images.length; i++) {
      // Targeting the obj, the move() will target the obj. properties in the image() P5 function
      this.move(this.images[i]);
    }
  }
}
