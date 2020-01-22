function getRandom() {
  const gif = [
    "assets/success/dancing-croissant.gif",
    "assets/success/disco-donut.gif",
    "assets/success/hula-churro.gif",
    "assets/success/jumping-donut.gif"
  ];

  let randomEl = Math.floor(Math.random() * gif.length);

  return gif[randomEl];
}
