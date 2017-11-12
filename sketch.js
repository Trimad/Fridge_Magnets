let words;
let wordBank = [];
let click;

function preload() {
  words = loadJSON("words.json");
  click = loadSound("pickup.mp3");
}

function setup() {

  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(51);

  textSize(16);
  let lettersWide = 0;
  let heightMultiplier = 1;

  for (var i = 0; i < words.words.length; i++) {
    lettersWide += words.words[i].length;
    wordBank[i] = new Word(16 + lettersWide * 8.5, heightMultiplier * 33, lettersWide * 8 + i, 32, words.words[i]);
    lettersWide += words.words[i].length;
    if (lettersWide * 10 - words.words[i].length * 8 + i > width) {
      heightMultiplier++;
      lettersWide = 0;

    }
  }

}

function draw() {

  background(51);
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

function Word(x, y, wide, tall, content) {

  this.x = x;
  this.y = y;
  this.wide = wide;
  this.tall = tall;
  this.content = content;
  this.selected = false;

  this.show = function() {

    fill(255);
    rectMode(CENTER, CENTER);
    rect(this.x, this.y, this.content.length * 16, this.tall);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.content, this.x, this.y);

  }

  this.interact = function() {
    click.play();
  }

  this.dragging = function() {

    if (this.selected) {
      this.x = mouseX;
      this.y = mouseY;
    }

  }
  this.hover = function() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < (this.tall / 2)) {
      return true;
    } else {
      return false;
    }
  }

}
