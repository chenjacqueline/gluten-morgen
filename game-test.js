// TEST GAMES.JS

class Game {
  constructor() {
    this.pastries = [];

    this.collectedCroissant = 0;
    this.collectedBrezel = 0;
    this.collectedBerliner = 0;
    this.collectedLaugenecke = 0;
    this.collectedZimtschnecke = 0;

    this.orderCount = 0;

    this.qtyCroissant = Math.floor(Math.random() * 5 + 1);
    this.qtyBrezel = Math.floor(Math.random() * 5 + 1);
    this.qtyBerliner = Math.floor(Math.random() * 5 + 1);
    this.qtyLaugenecke = Math.floor(Math.random() * 5 + 1);
    this.qtyZimtschnecke = Math.floor(Math.random() * 5 + 1);
  }

  setup() {
    this.background = new Background();
    this.player = new Player();
    this.imgOrderCompleted = loadImage("assets/success-order-complete.png");
    this.imgGameOver = loadImage("assets/game-over.png");

    this.pastryGraphics = [
      loadImage("assets/img-croissant.png"),
      loadImage("assets/img-brezel.png")
      // loadImage("assets/img-berliner.png"),
      // loadImage("assets/img-laugenecke.png"),
      // loadImage("assets/img-zimtschnecke.png")
    ];
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

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 2
      ) {
        this.pastries.splice(i, 1);
        this.collectedBerliner += 1;
        document.querySelector(
          "#berliner .status"
        ).innerText = this.collectedBerliner;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 3
      ) {
        this.pastries.splice(i, 1);
        this.collectedLaugenecke += 1;
        document.querySelector(
          "#laugenecke .status"
        ).innerText = this.collectedLaugenecke;
      }

      if (
        this.pastries[i].collides(this.player) &&
        this.pastries[i].randomIndex === 4
      ) {
        this.pastries.splice(i, 1);
        this.collectedZimtschnecke += 1;
        document.querySelector(
          "#zimtschnecke .status"
        ).innerText = this.collectedZimtschnecke;
      }
    }

    // if (game.orderCount < 3) {
    //   game.easy();
    // } else if (game.orderCount >= 3 && game.orderCount < 7) {
    //   document.querySelector("#berliner").style.visibility = "visible";
    //   game.easy();
    //   game.medium();
    // } else if (game.orderCount >= 7 && game.orderCount < 12) {
    //   document.querySelector("#laugenecke").style.visibility = "visible";
    //   game.easy();
    //   game.medium();
    //   game.intermediate();
    // } else if (game.orderCount >= 12) {
    //   document.querySelector("#zimtschnecke").style.visibility = "visible";
    //   game.easy();
    //   game.medium();
    //   game.intermediate();
    //   game.advanced();
    // }

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

  level() {
    document.querySelector("#completed-orders p").innerText = this.orderCount;

    if (this.orderCount >= 3 && this.orderCount < 7) {
      document.querySelector("#berliner").style.visibility = "visible";
    } else if (this.orderCount >= 7 && this.orderCount < 12) {
      document.querySelector("#laugenecke").style.visibility = "visible";
    } else if (this.orderCount >= 12) {
      document.querySelector("#zimtschnecke").style.visibility = "visible";
    }

    // Whenever an order is completed:
    if (
      this.collectedCroissant === this.qtyCroissant &&
      this.collectedBrezel === this.qtyBrezel
    ) {
      this.orderCount += 1;
      background(this.imgOrderCompleted);
      noLoop();

      this.qtyCroissant = Math.floor(Math.random() * 5 + 1);
      this.qtyBrezel = Math.floor(Math.random() * 5 + 1);
      game.orders();
      this.collectedCroissant = 0;
      this.collectedBrezel = 0;
      document.querySelector("#croissant .status").innerText = 0;
      document.querySelector("#brezel .status").innerText = 0;

      setTimeout(function() {
        loop();
      }, 1500);
    }

    // Error handling for over-collection:
    if (
      this.collectedCroissant > this.qtyCroissant ||
      this.collectedBrezel > this.qtyBrezel
    ) {
      background(this.imgGameOver);
      noLoop();

      this.collectedCroissant = 0;
      this.collectedBrezel = 0;

      //   setTimeout(function() {
      //     loop();
      //   }, 1500);
    }
  }
}

const game = new Game();
