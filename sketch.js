let words;
let wordBank = [];
let click;
let bg;
function preload() {
  words = loadJSON("words.json");
  click = loadSound("pickup.mp3");
  bg = loadImage("bg03.jpg");
}

function setup() {

  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(bg);

  makeMagnets((height+width)/140);

}

function makeMagnets(magnetSize) {

  textSize(magnetSize);

  let wide = 0;
  let tall = magnetSize * 2;
  let xPosition = 0;
  let yPosition = 0;
  let yMultiplier = 1;
  let rowCounter = 0;

  for (var i = 0; i < words.words.length; i++) {

    if (xPosition + (words.words[i].length * magnetSize) >= width) {
      yMultiplier++;
      rowCounter++;
      xPosition = 0;
    }

    xPosition += words.words[i].length * magnetSize / 2;
    yPosition = yMultiplier * tall + rowCounter-tall/2;
    wide = words.words[i].length * magnetSize;

    wordBank[i] = new Word(xPosition, yPosition, wide, tall, words.words[i]);

    xPosition += words.words[i].length * magnetSize / 2 + 1;

  }

}

function draw() {

  background(bg);
  for (var i = 0; i < wordBank.length - 1; i++) {

    wordBank[i].show();
    wordBank[i].dragging();
    if (wordBank[i].hover()) {
      cursor(HAND);
      break;
    } else {
      cursor(ARROW);
    }
  }
  for (var i = 0; i < wordBank.length - 1; i++) {
    wordBank[i].show();
    wordBank[i].dragging();
  }
}

function mousePressed() {
  for (var i = 0; i < wordBank.length; i++) {
    if (wordBank[i].hover()) {
      wordBank[i].interact();
      wordBank[i].selected = true;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < wordBank.length; i++) {
    if (wordBank[i].hover()) {
      wordBank[i].interact();
      wordBank[i].selected = false;
    }
  }
}
