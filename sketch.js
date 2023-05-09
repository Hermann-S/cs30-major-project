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


// this class is not working how I want it too I will figure it out
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
  keyPressed() {
    if (keyCode === 49) {
      this.w = 70;
      this.h = 30;
    }
    else if (keyCode ===  50) {
      this.w = 60;
      this.h = 25;
      this.dy -= 7;
    }
    else if (keyCode === 51) {
      this.w = 50;
      this.h = 20;
      this.dy -= 9;
    }
  }
}

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
  let batter = new Bat(this.dx, this.dy);
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
    else {
      if (state === "moving") {
        ballSize += 0.3;
      }
    }
  }
  else if (state === "hit") {
    ballSize -= 1;
    ballZoomTimer.pause();
  }
}


// everything hurts
// bat now works HOORAY!!! well it kinda works anyway
function batting() {
  if (dist(x, y, mouseX, mouseY) < 30) {
    state = "hit";
    if (state === "hit") {
      y = this.dy;
      
    }
  }
  else if (state === "hit") {
    y = this.dy;
  }
  //   if (d <= 30) {
  // }
  else {
    state = "moving";
  }
}