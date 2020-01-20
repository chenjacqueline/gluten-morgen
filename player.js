class Player {
  constructor() {
    this.img = loadImage("assets/baker.png");
    this.velocity = 0;
    this.gravity = 0.2;
    this.jumpCount = 0;
  }

  setup() {
    // Setting variables for the width and height of the player image
    this.height = this.img.height;
    this.width = this.img.width;

    this.x = 65;
    this.y = height - 195;

    this.originY = this.y;
  }

  // This isn't drawn 60x/s, like in the p5 draw function:
  draw() {
    this.velocity += this.gravity; // depending on the initial this.velocity value - over time, the velocity increases
    this.y += this.velocity; // if the velocity is a positive number, y will increment (player fall), if the velocity is a negative number, y will decrement (player rise)

    // If the y-coordinate of the player is greater than or equal to it's original position, reset the player to the original position.
    if (this.y >= this.originY) {
      this.y = this.originY;
      // Once the player reaches the ground, reset the jumpCount
      this.jumpCount = 0;
    }
    image(this.img, this.x, this.y);
  }

  jump() {
    if (this.jumpCount < 2) {
      this.velocity = -8;
      this.jumpCount += 1;
    }
  }
}
