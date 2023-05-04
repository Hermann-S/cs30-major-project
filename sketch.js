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
let y = 488.8;
let dx;
let dy;
let isBallShowing = true;
let ballStopTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(100);
  ballZoomTimer.start();
  // eslint-disable-next-line no-undef
  ballStopTimer = new Timer(1500);
}

function draw() {
  background(138, 8, 8);
  rectMode(CENTER);
  rect(mouseX, mouseY, 70, 30);
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
  let d = dist(x, y, mouseX, mouseY,d < 30);
  if (d && ballSize >= 20) {
    state = "hit";
    if (state === "hit") {
      y -= 5;
      
    }
  }
  //   if (d <= 30) {
  // }
  else {
    state = "moving";
  }
}