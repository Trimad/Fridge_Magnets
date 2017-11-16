function Word(x, y, wide, tall, content) {

  this.x = x;
  this.y = y;
  this.wide = wide;
  this.tall = tall;
  this.content = content;
  this.selected = false;

  this.show = function() {
    fill(255);
    stroke(0);
    rectMode(CENTER, CENTER);
    rect(this.x, this.y, this.wide, this.tall);
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
    if (mouseX > this.x-wide/2 && mouseX < this.x+wide/2 && mouseY > this.y-tall/2 && mouseY < this.y+tall/2) {
      return true;
    } else {
      return false;
    }
  }
}
