class Game {
  constructor() {
    this.pastries = [];
    // this.pastryGraphics = [];
  }

  preload() {
    //   to preload assets so that theyre available for the setup
  }

  setup() {
    this.background = new Background();
    this.player = new Player();

    this.pastryGraphics = [
      loadImage("assets/img-croissant.png"),
      loadImage("assets/img-brezel.png")
    ];
  }

  draw() {
    this.background.draw();

    if (frameCount % 120 === 0) {
      this.pastries.push(new Pastry());
    }

    this.pastries = this.pastries.filter(
      function(pastry) {
        // Remove pastries that have no collision AND left the canvas
        // If it doesn't collide and is still within the canvas, then add to array
        if (!pastry.collides(this.player) && pastry.x + pastry.width >= 0) {
          return true;
        }
        // Need to bind so that the pastry has access to the Game class
      }.bind(this)
    );

    // For all the pastries that made it into the array, draw them
    this.pastries.forEach(function(pastry) {
      pastry.draw();
    });

    this.player.draw();
  }
}

const game = new Game();

//---- P5 functions
function preload() {
  game.setup();
}

function setup() {
  let cnv = createCanvas(800, 550);
  cnv.parent("canvas");
  game.player.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
}
