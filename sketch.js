// MLB the Show
// Hermann Stirrett
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballSize = 5;
let ballZoomTimer;
let x;
let y;
let dx;
let dy;
let isBallShowing = true;
let ballStopTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(100);
  ballZoomTimer.start();
}

function draw() {
  background("orange");
  rectMode(CENTER);
  rect(mouseX, mouseY, 70, 30);
  fill(255, 255, 255, 50);
  stirkeZone();
  pitcher();
  // batting();
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  x = width/2;
  y = height*0.65;
  // eslint-disable-next-line no-undef
  ballStopTimer = new Timer(500);
  if (ballZoomTimer.expired()) {
    circle(x, y, ballSize);
    if (ballSize === 30) {
      // need to remove circle
      // this circle is going to remove me...
      ballStopTimer.start();
      if (ballStopTimer.expired()) {
        isBallShowing = false;
      }

    }
    else {
      ballSize += 0.5;
    }
  }
}


// the ball is not inceasing at a visible rate
// everything hurts
// ballSize = 15;

// for (let m = millis(); m < 5000; m++) {
//   for (let i = 15;i < 30; i++) {
// ballSize += 1;
// circle(width/2, height*0.65, ballSize);
//     millis(2000);
//   }
// }
// console.log();

// function batting() {

//   // bat is not having an effect on the ball
//   let d = dist(pitcher.x, pitcher.y, mouseX, mouseY);
//   if (d < 15) {
//     pitcher.y += 5;
//   }
// }