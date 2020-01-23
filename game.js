class Game {
  constructor() {
    this.pastries = [];
    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;

    this.qtyCroissant = Math.floor(Math.random() * 5 + 1);
    this.qtyBrezel = Math.floor(Math.random() * 5 + 1);
    this.qtyBerliner = Math.floor(Math.random() * 5 + 1);
    this.qtyLaugenecke = Math.floor(Math.random() * 5 + 1);
    this.qtyZimtschnecke = Math.floor(Math.random() * 5 + 1);

    this.collected = document.getElementsByClassName("collected");
    this.orderCount = 0;
    this.frames = 100;
    this.colorfulBaker = false;
  }

  setup() {
    // Called in P5 preload
    this.background = new Background();
    this.player = new Player();
    this.imgGameOver = loadImage("assets/game-over.png");

    // Load audio files
    this.collect = loadSound("assets/audio/collect.mp3");
    this.success = loadSound("assets/audio/success.wav");
    this.gameover = loadSound("assets/audio/gameover.mp3");
    this.changeOutfit = loadSound("assets/audio/change-outfit.mp3");

    this.pastryGraphics = [
      loadImage("assets/pastries/img-croissant.png"),
      loadImage("assets/pastries/img-brezel.png"),
      loadImage("assets/pastries/img-berliner.png"),
      loadImage("assets/pastries/img-laugenecke.png"),
      loadImage("assets/pastries/img-zimtschnecke.png"),
      loadImage("assets/pastries/magic-donut.gif")
    ];
  }

  start() {
    // Start screen
    noLoop();
  }

  draw() {
    // Generating pastries in the game
    this.background.draw();

    if (frameCount % this.frames === 0) {
      // Check level to manage range of index values to pass to pastry constructor argument and increase speed:
      if (this.orderCount < 2) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 2)));
      } else if (this.orderCount >= 2 && this.orderCount < 5) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 3)));
        this.frames = 90;
        this.background.images[0].speed = 8;
        this.background.images[1].speed = 10;
        this.background.images[2].speed = 12;
      } else if (this.orderCount >= 5 && this.orderCount < 8) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 4)));
        this.frames = 80;
        this.background.images[0].speed = 9;
        this.background.images[1].speed = 11;
        this.background.images[2].speed = 13;
      } else if (this.orderCount >= 8) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 6)));
        this.frames = 65;
        this.background.images[0].speed = 11;
        this.background.images[1].speed = 13;
        this.background.images[2].speed = 15;
      }
    }

    // Collisions, removal of pastry from canvas, adding to collection count:
    for (let i = 0; i < this.pastries.length - 1; i++) {
      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 0
      ) {
        // this.collectSound.play();
        this.pastries.splice(i, 1);
        this.collectedCroissant += 1;
        this.collect.play();
        document.querySelector(
          "#croissant .collected"
        ).innerText = this.collectedCroissant;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 1
      ) {
        this.pastries.splice(i, 1);
        this.collectedBrezel += 1;
        this.collect.play();
        document.querySelector(
          "#brezel .collected"
        ).innerText = this.collectedBrezel;
      }
      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 2
      ) {
        this.pastries.splice(i, 1);
        this.collectedBerliner += 1;
        this.collect.play();
        document.querySelector(
          "#berliner .collected"
        ).innerText = this.collectedBerliner;
      }
      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 3
      ) {
        this.pastries.splice(i, 1);
        this.collectedLaugenecke += 1;
        this.collect.play();
        document.querySelector(
          "#laugenecke .collected"
        ).innerText = this.collectedLaugenecke;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 4
      ) {
        this.pastries.splice(i, 1);
        this.collectedZimtschnecke += 1;
        this.collect.play();
        document.querySelector(
          "#zimtschnecke .collected"
        ).innerText = this.collectedZimtschnecke;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 5
      ) {
        this.pastries.splice(i, 1);
        this.changeOutfit.play();
        this.randomBakerDrawer();
      }
    }

    // For all the pastries that made it into the array, draw them:
    this.pastries.forEach(function(pastry) {
      pastry.draw();
    });

    // Condition constantly being checked; depends on if player caught magic donut:
    if (this.colorfulBaker) {
      this.player.drawRandomBaker();
    } else {
      this.player.draw();
    }
  }

  // Resetting random index & toggling colorfulBaker state btw true / false:
  randomBakerDrawer() {
    this.player.randomBakerReset();
    this.colorfulBaker = true;
  }

  orders() {
    // Generating randomized orders
    document.querySelector("#croissant .needed").innerText = this.qtyCroissant;
    document.querySelector("#brezel .needed").innerText = this.qtyBrezel;
    document.querySelector("#berliner .needed").innerText = this.qtyBerliner;
    document.querySelector(
      "#laugenecke .needed"
    ).innerText = this.qtyLaugenecke;
    document.querySelector(
      "#zimtschnecke .needed"
    ).innerText = this.qtyZimtschnecke;
  }

  reset() {
    // Resetting things after an order completion
    this.orderCount += 1;
    this.success.play();

    document.querySelector(".success").src = getRandom();
    document.querySelector(".success").style.display = "block";
    noLoop();

    // Resetting inactive state for all pastry graphics in the order:
    const icons = document.getElementsByClassName("icon");
    for (const icon of icons) {
      icon.classList.add("inactive");
    }

    // Resetting amounts of collected pastries for new round:
    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;
    for (const item of this.collected) {
      item.innerText = 0;
    }

    // Resetting the needed quantities for each pastry:
    this.qtyCroissant = Math.floor(Math.random() * 4 + 1);
    this.qtyBrezel = Math.floor(Math.random() * 4 + 1);
    this.qtyBerliner = Math.floor(Math.random() * 4 + 1);
    this.qtyLaugenecke = Math.floor(Math.random() * 4 + 1);
    this.qtyZimtschnecke = Math.floor(Math.random() * 4 + 1);
    game.orders();

    setTimeout(function() {
      document.querySelector(".success").style.display = "none";
      loop();
    }, 2000);
  }

  level() {
    // Always running with the draw()
    document.querySelector("#completed-orders p").innerText = this.orderCount;

    if (highScore !== null && this.orderCount > highScore) {
      highScore = this.orderCount;
      localStorage.setItem("highscore", highScore);
    } else if (highScore === null) {
      localStorage.setItem("highscore", 0);
    }

    //  Displaying local high score:
    document.querySelector(
      "#completed-orders .highscore"
    ).innerText = highScore;

    // Reveal more pastry types in the order as level increases:
    if (this.orderCount >= 2 && this.orderCount < 5) {
      document.querySelector("#berliner").style.visibility = "visible";
    } else if (this.orderCount >= 5 && this.orderCount < 8) {
      document.querySelector("#laugenecke").style.visibility = "visible";
    } else if (this.orderCount >= 8) {
      document.querySelector("#zimtschnecke").style.visibility = "visible";
    }

    // Manage active and inactive states of pastry icon (dependent on completion status):
    if (this.collectedCroissant === this.qtyCroissant) {
      document.querySelector("#croissant .icon").classList.remove("inactive");
    }
    if (this.collectedBrezel === this.qtyBrezel) {
      document.querySelector("#brezel .icon").classList.remove("inactive");
    }
    if (this.collectedBerliner === this.qtyBerliner) {
      document.querySelector("#berliner .icon").classList.remove("inactive");
    }
    if (this.collectedLaugenecke === this.qtyLaugenecke) {
      document.querySelector("#laugenecke .icon").classList.remove("inactive");
    }
    if (this.collectedZimtschnecke === this.qtyZimtschnecke) {
      document
        .querySelector("#zimtschnecke .icon")
        .classList.remove("inactive");
    }

    // Reset the game whenever the order is completed, depending on the level:
    if (
      (this.orderCount < 2 &&
        this.collectedCroissant === this.qtyCroissant &&
        this.collectedBrezel === this.qtyBrezel) ||
      (this.orderCount >= 2 &&
        this.orderCount < 5 &&
        this.collectedCroissant === this.qtyCroissant &&
        this.collectedBrezel === this.qtyBrezel &&
        this.collectedBerliner === this.qtyBerliner) ||
      (this.orderCount >= 5 &&
        this.orderCount < 8 &&
        this.collectedCroissant === this.qtyCroissant &&
        this.collectedBrezel === this.qtyBrezel &&
        this.collectedBerliner === this.qtyBerliner &&
        this.collectedLaugenecke === this.qtyLaugenecke) ||
      (this.orderCount >= 8 &&
        this.orderCount < 8 &&
        this.collectedCroissant === this.qtyCroissant &&
        this.collectedBrezel === this.qtyBrezel &&
        this.collectedBerliner === this.qtyBerliner &&
        this.collectedLaugenecke === this.qtyLaugenecke &&
        this.collectedZimtschnecke === this.qtyZimtschnecke)
    ) {
      game.reset();
    }

    // Game over (error handling for over-collection):
    if (
      this.collectedCroissant > this.qtyCroissant ||
      this.collectedBrezel > this.qtyBrezel ||
      this.collectedBerliner > this.qtyBerliner ||
      this.collectedLaugenecke > this.qtyLaugenecke ||
      this.collectedZimtschnecke > this.qtyZimtschnecke
    ) {
      background(this.imgGameOver);
      bgMusic.setVolume(0);
      this.gameover.play();
      noLoop();
      // Setting a random value represent game over state for keyPressed function:
      this.orderCount = "-";
    }
  }

  restart() {
    // For restarting the game after game over:
    this.pastries = [];
    this.orderCount = 0;
    bgMusic.setVolume(0.4);
    // Resetting amounts of collected pastries for new round
    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;
    this.colorfulBaker = false;

    for (const item of this.collected) {
      item.innerText = 0;
    }

    // Removing elements from panel:
    document.querySelector("#berliner").style.visibility = "hidden";
    document.querySelector("#laugenecke").style.visibility = "hidden";
    document.querySelector("#zimtschnecke").style.visibility = "hidden";

    // Resetting inactive state for all pastry graphics in the order:
    const icons = document.getElementsByClassName("icon");
    for (const icon of icons) {
      icon.classList.add("inactive");
    }

    // Resetting the needed quantities for each pastry
    this.qtyCroissant = Math.floor(Math.random() * 4 + 1);
    this.qtyBrezel = Math.floor(Math.random() * 4 + 1);
    this.qtyBerliner = Math.floor(Math.random() * 4 + 1);
    this.qtyLaugenecke = Math.floor(Math.random() * 4 + 1);
    this.qtyZimtschnecke = Math.floor(Math.random() * 4 + 1);
    game.orders();
    loop();
  }
}

const game = new Game();
