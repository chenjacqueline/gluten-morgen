class Player {
  constructor() {
    this.img = loadImage("assets/baker/baker.png");
    this.colorSwap = [
      loadImage("assets/baker/baker-blue.png"),
      loadImage("assets/baker/baker-green.png"),
      loadImage("assets/baker/baker-salmon.png"),
      loadImage("assets/baker/baker-yellow.png")
    ];
    this.randomBaker = Math.floor(Math.random() * this.colorSwap.length);
    this.velocity = 0;
    this.gravity = 0.3;
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

  // Function to reset random index everytime drawRandomBaker() is called
  randomBakerReset() {
    let random = Math.floor(Math.random() * this.colorSwap.length);
    // While loop to ensure the same random index doesn't called twice in a row
    while (random === this.randomBaker) {
      random = Math.floor(Math.random() * this.colorSwap.length);
    }
    this.randomBaker = random;
    console.log(this.randomBaker);
  }

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

  drawRandomBaker() {
    // Bonus easter egg!
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= this.originY) {
      this.y = this.originY;
      this.jumpCount = 0;
    }
    image(this.colorSwap[this.randomBaker], this.x, this.y);
  }

  jump() {
    if (this.jumpCount < 3) {
      this.velocity = -9;
      this.jumpCount += 1;
    }
  }
}
