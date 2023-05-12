// MLB the Show
// Hermann Stirrett
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "moving";
let ballSize = 5;
let ballZoomTimer;
let x = 517;
let y = 470;
let isBallShowing = true;
let ballStopTimer;



// Makes a Cursor that indicates the hitbox keys change the size and power of the bat
class Bat {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    // this.r = r;
    // this.g = g;
    // this.b = b;
    this.w = 70;
    this.h = 30;
  }

  display() {
    rect(mouseX, mouseY, this.w, this.h);
  }

  update() {
    
  }
  handleKey() {
    if (keyCode === 49) {
      this.w = 70;
      this.h = 30;
    }
    else if (keyCode ===  50) {
      this.w = 50;
      this.h = 20;
      this.dy -= 7;
    }
    else if (keyCode === 51) {
      this.w = 30;
      this.h = 15;
      this.dy -= 9;
    }
  }
}
let batter = new Bat(0, -5);

function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(100);
  ballZoomTimer.start();
  // eslint-disable-next-line no-undef
  ballStopTimer = new Timer(1500);
}

function draw() {
  // this does not work yet
  background("pink");
  rectMode(CENTER);
  // rect(mouseX, mouseY, 70, 30);
  fill(255, 255, 255, 50);
  stirkeZone();
  pitcher();
  batting();
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  x = width/2;
  // eslint-disable-next-line no-undef
  if (ballZoomTimer.expired()) {
    circle(x, y, ballSize);
    ballStopTimer.start();
    if (ballSize >= 30 && state === "moving") {
      // this circle is going to remove me...
      ballZoomTimer.pause();
      ballZoomTimer.reset();
    }
    else if (state === "hit") {
      // ballSize -= 1;
      ballZoomTimer.pause();
      ballZoomTimer.reset();
      y += this.dy;
    }
    else {
      if (state === "moving") {
        ballSize += 0.3;
      }
    }
  }
}


// everything hurts
// the ball now dissapears once it's hit
function batting() {
  batter.display();
  batter.handleKey();
  // if (dist(x, y, mouseX, mouseY) < 30) {
  if (ballSize > 20) {
    state = "hit";
    if (state === "hit") {
      y += this.dy;
      
    }
  }
  else if (state === "hit") {
    y += this.dy;
  }
  //   if (d <= 30) {
  // }
  else {
    state = "moving";
  }
}