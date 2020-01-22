let bgMusic;
let jump;

function preload() {
  bgMusic = loadSound("assets/audio/bg-music-2.wav");
  jump = loadSound("assets/audio/jump.mp3");
  game.setup();
  // soundFormats("wav");
}

function setup() {
  bgMusic.setVolume(0.4);
  bgMusic.play();
  bgMusic.loop();
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
    jump.play();
    jump.setVolume(1.2);
  }
  if (game.orderCount === "-" && keyCode === 13) {
    game.restart();
  }
}
