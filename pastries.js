class Pastry {
  constructor(randomIndex) {
    // The width and height of the obstacle graphic:
    this.width = 50;
    this.height = 43;
    this.randomIndex = randomIndex;

    // We want the obstacles to start from the right edge of the canvas and move towards the player:
    this.x = width;
    this.y = random(80, 370); // Randomize the y-axis position; random is a p5 function that accepts a range
    // this.counter = 0;
  }

  draw() {
    this.x -= 5;
    // rect(this.x, this.y, this.width, this.height);

    image(
      game.pastryGraphics[this.randomIndex],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  collides(player) {
    // check if pastry collides with player
    if (this.x + this.width < player.x || player.x + player.width < this.x) {
      return false;
    }
    if (player.y > this.y + this.height || player.y + player.height < this.y)
      return false;
    return true;
  }
}
