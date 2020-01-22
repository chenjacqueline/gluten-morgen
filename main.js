function preload() {
  game.setup();
}

function setup() {
  let cnv = createCanvas(800, 550);
  textAlign(CENTER, CENTER);
  cnv.parent("canvas");
  game.player.setup();
  game.orders();
}

function draw() {
  game.draw();
  game.level();
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
  if (game.orderCount === -1 && keyCode === 13) {
    game.restart();
  }
}
