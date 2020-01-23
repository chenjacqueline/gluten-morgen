let bgMusic;
let jump;
let highScore = parseInt(localStorage.getItem("highscore"));

function preload() {
  bgMusic = loadSound("assets/audio/bg-music-2.wav");
  jump = loadSound("assets/audio/jump.mp3");
  game.setup();
  // soundFormats("wav");
}

function setup() {
  bgMusic.setVolume(0.3);
  bgMusic.play();
  bgMusic.loop();
  let cnv = createCanvas(800, 550);
  textAlign(CENTER, CENTER);
  cnv.parent("canvas");
  game.player.setup();
  game.orders();
  game.start();
}

function draw() {
  game.draw();
  game.level();
}

function muteSounds() {
  bgMusic.setVolume(0);
}

function keyPressed() {
  // Start screen
  if (game.orderCount === 0 && keyCode === 32) {
    document.querySelector(".cover").style.display = "none";
    loop();
  }
  // Player jump
  if (keyCode === 32) {
    game.player.jump();
    jump.play();
    // jump.setVolume(1.2);
  }
  // Restarting after game over
  if (game.orderCount === "-" && keyCode === 13) {
    game.restart();
  }
}
