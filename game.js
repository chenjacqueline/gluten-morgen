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

    this.orderCount = 0;
  }

  setup() {
    this.background = new Background();
    this.player = new Player();
    this.imgOrderCompleted = loadImage("assets/success-order-complete.png");
    this.imgGameOver = loadImage("assets/game-over.png");

    this.pastryGraphics = [
      loadImage("assets/img-croissant.png"),
      loadImage("assets/img-brezel.png"),
      loadImage("assets/img-berliner.png"),
      loadImage("assets/img-laugenecke.png"),
      loadImage("assets/img-zimtschnecke.png")
    ];

    this.collectionGraphics = [
      loadImage("assets/yum-blue.png"),
      loadImage("assets/yum-green.png"),
      loadImage("assets/yum-red.png"),
      loadImage("assets/yum-salmon.png"),
      loadImage("assets/yum-yellow.png")
    ];
  }

  draw() {
    this.background.draw();

    if (frameCount % 100 === 0) {
      // Check level to manage range of index values to pass to pastry constructor argument:
      if (this.orderCount < 2) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 2)));
      } else if (this.orderCount >= 2 && this.orderCount < 5) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 3)));
      } else if (this.orderCount >= 5 && this.orderCount < 8) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 4)));
      } else if (this.orderCount >= 8) {
        this.pastries.push(new Pastry(Math.floor(Math.random() * 5)));
      }
    }

    for (let i = 0; i < this.pastries.length - 1; i++) {
      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 0
      ) {
        this.pastries.splice(i, 1);
        this.collectedCroissant += 1;
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
        document.querySelector(
          "#zimtschnecke .collected"
        ).innerText = this.collectedZimtschnecke;
      }
    }

    // For all the pastries that made it into the array, draw them:
    this.pastries.forEach(function(pastry) {
      pastry.draw();
    });

    this.player.draw();
  }

  orders() {
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
    this.orderCount += 1;
    document.querySelector(".success").style.display = "block";
    noLoop();

    // Resetting amounts of collected pastries for new round
    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;
    document.querySelector("#croissant .collected").innerText = 0;
    document.querySelector("#brezel .collected").innerText = 0;
    document.querySelector("#berliner .collected").innerText = 0;
    document.querySelector("#laugenecke .collected").innerText = 0;
    document.querySelector("#zimtschnecke .collected").innerText = 0;

    // Resetting the needed quantities for each pastry
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
    document.querySelector("#completed-orders p").innerText = this.orderCount;

    // Reveal more pastry types as level increases:
    if (this.orderCount >= 2 && this.orderCount < 5) {
      document.querySelector("#berliner").style.visibility = "visible";
    } else if (this.orderCount >= 5 && this.orderCount < 8) {
      document.querySelector("#laugenecke").style.visibility = "visible";
    } else if (this.orderCount >= 8) {
      document.querySelector("#zimtschnecke").style.visibility = "visible";
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

    // Error handling for over-collection:
    if (
      this.collectedCroissant > this.qtyCroissant ||
      this.collectedBrezel > this.qtyBrezel ||
      this.collectedBerliner > this.qtyBerliner ||
      this.collectedLaugenecke > this.qtyLaugenecke ||
      this.collectedZimtschnecke > this.collectedZimtschnecke
    ) {
      background(this.imgGameOver);
      noLoop();
      // Choosing a random # to represent game over state for keyPressed function:
      this.orderCount = -1;
    }
  }

  restart() {
    this.pastries = [];
    this.orderCount = 0;

    // Resetting amounts of collected pastries for new round
    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;
    document.querySelector("#croissant .collected").innerText = 0;
    document.querySelector("#brezel .collected").innerText = 0;
    document.querySelector("#berliner .collected").innerText = 0;
    document.querySelector("#laugenecke .collected").innerText = 0;
    document.querySelector("#zimtschnecke .collected").innerText = 0;

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
