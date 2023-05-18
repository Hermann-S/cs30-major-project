// MLB the Show
// Hermann Stirrett
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "getting ready";
let ballSize = 0;
let ballZoomTimer;
let x = 517;
let y = 470;
let isBallShowing = true;
// let ballStopTimer;
// let pitchClockTimer;

// need to find the zone x and y values, need to get a working base/runs system
let zoneX1;
let zoneY1;
let zoneX2;
let zoneY2;
let base = 0;
let finish = false;


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
      this.dy = -10;
    }
    else if (keyCode ===  50) {
      this.w = 50;
      this.h = 20;
      this.dy = -15;
    }
    else if (keyCode === 51) {
      this.w = 30;
      this.h = 15;
      this.dy = -20;
    }
  }
}
let batter = new Bat(0, -5);

function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(100);
  state = "gettingReady";
  ballZoomTimer.start();
  // eslint-disable-next-line no-undef
  ballStopTimer = new Timer(1500);
  // eslint-disable-next-line no-undef
  // pitchClockTimer = new Timer(90000);
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
  // reset();
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  x = width/2;
  // eslint-disable-next-line no-undef
  if (ballZoomTimer.expired() && state === "gettingReady") {
    state = "moving";
  }

  circle(x, y, ballSize);
  // ballStopTimer.start();
  if (ballSize >= 30 && state === "moving") {
    // this circle is going to remove me...
    // ballZoomTimer.pause();
    ballZoomTimer.reset();
    // console.log(ballZoomTimer.getRemainingTime());
    ballSize = 0;
    state = "gettingReady";
    // pitchClockTimer.start();

  }
  else if (state === "hit") {
    // ballSize -= 1;
    ballZoomTimer.pause();
    ballZoomTimer.reset();
    // y += batter.dy;
  }
  else {
    if (state === "moving") {
      ballSize += 0.3;
    }
  }
}


// everything hurts
// the ball now dissapears once it's hit
function batting() {
  batter.display();
  batter.handleKey();
  if (dist(x, y, mouseX, mouseY) < 30) {
  // if (ballSize > 20) {
    state = "hit";
    if (state === "hit") {
      y += batter.dy;
      
    }
  }
  else if (state === "hit") {
    y += batter.dy;
  }
  //   if (d <= 30) {
  // }
  // else {
  //   state = "moving";
  // }
}


// work in progress
function theCount(){
  let strike = 0;
  let ball = 0;
  let out = 0;
  if (x < zoneX1 || y < zoneY1 || x > zoneX2 || y > zoneY2) {
    ball ++;
  }
  else {
    strike ++;
  }
  if (strike === 3) {
    out ++;
  }
  if (ball === 4) {
    base ++;
  }
  if (out === 3) {
    finish = true;
  }
}

// work in progress should probably just use timers instead of using a key to restart
// function reset() {
//   if (pitchClockTimer.expired) {
//     pitchClockTimer.reset;
//     pitchClockTimer.pause;
//     ballZoomTimer.start();
//   }
// }