class Game {
  constructor() {
    this.pastries = [];
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

    this.collectedCroissant = 0;
    this.collectedBrezel = 0;

    this.qtyCroissant = Math.floor(Math.random() * 5 + 1);
    this.qtyBrezel = Math.floor(Math.random() * 5 + 1);
  }

  draw() {
    this.background.draw();

    if (frameCount % 120 === 0) {
      this.pastries.push(new Pastry());
    }

    for (let i = 0; i < this.pastries.length - 1; i++) {
      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 0
      ) {
        this.pastries.splice(i, 1);
        this.collectedCroissant += 1;
        document.querySelector(
          "#croissant .status"
        ).innerText = this.collectedCroissant;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 1
      ) {
        this.pastries.splice(i, 1);
        this.collectedBrezel += 1;
        document.querySelector(
          "#brezel .status"
        ).innerText = this.collectedBrezel;
      }
    }

    // For all the pastries that made it into the array, draw them:
    this.pastries.forEach(function(pastry) {
      pastry.draw();
    });

    // Error handling for over-collection:
    if (this.collectedCroissant > this.qtyCroissant) {
      noLoop();
      alert("Oops! Looks like you've grabbed one too many croissants.");
    }

    if (this.collectedBrezel > this.qtyBrezel) {
      noLoop();
      alert("Oops! Look like you've grabbed one too many brezeln.");
    }

    this.player.draw();
  }

  orders() {
    document.querySelector("#croissant .needed").innerText = this.qtyCroissant;
    document.querySelector("#brezel .needed").innerText = this.qtyBrezel;
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
  game.orders();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
}
