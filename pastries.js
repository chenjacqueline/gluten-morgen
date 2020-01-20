class Pastry {
  constructor() {
    // The width and height of the obstacle graphic:
    this.width = 50;
    this.height = 43;
    this.randomIndex = Math.floor(Math.random() * 2); // Should randomly generate 0 or 1 (only 2 items for now)

    // We want the obstacles to start from the right edge of the canvas and move towards the player:
    this.x = width;
    this.y = random(80, 410); // Randomize the y-axis position; random is a p5 function that accepts a range
    // this.counter = 0;
  }

  draw() {
    this.x -= 3;
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
