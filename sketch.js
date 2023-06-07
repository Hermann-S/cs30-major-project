// MLB the Show
// Hermann Stirrett
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "gettingReady";
let ballSize = 0;
let ballZoomTimer;
let x = 517;
let y = 470;
let isBallShowing = true;
let base = 0;
let finish = false;
let strike = 0;
let ball = 0;
let out = 0;
let mySound;

// need to get a working base/runs system


// Makes a Cursor that indicates the hitbox keys change the size and power of the bat
class Bat {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
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



function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(1000);
  state = "gettingReady";
  ballZoomTimer.start();
  // eslint-disable-next-line no-undef
  ballStopTimer = new Timer(1500);
}


function draw() {
  // this does not work yet
  background("brown");
  rectMode(CENTER);
  fill(255, 255, 255, 50);
  stirkeZone();
  pitcher();
  batting();
  theCount();

  push();
  pop();
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  x = width/2;
  // eslint-disable-next-line no-undef
  if (ballZoomTimer.expired() && state === "gettingReady") {
    ballSize = 0;
    state = "moving";
  }
  
  circle(x, y, ballSize);
  // ballStopTimer.start();
  if (ballSize >= 30 && state === "moving") {
    ballZoomTimer.reset();
    ballSize = 0;
    state = "gettingReady";
    
  }
  else if (state === "hit") {
    // ballSize -= 1;
    ballZoomTimer.pause();
    ballZoomTimer.reset();
    // state = "gettingReady";
  }
  else {
    if (state === "moving") {
      ballSize += 0.3;
    }
  }
}


// everything hurts
// ball freezes when near the bat made some improvements but still broken
function batting() {
  batter.display();
  batter.handleKey();
  if (dist(x, y, mouseX, mouseY) < 30 && ballSize > 25 && mouseIsPressed) {
    // if (ballSize > 20) {
    state = "hit";
  }

  // very broken LMAO
  // else if (dist(x, y, mouseX, mouseY) > 30 && mouseIsPressed && state === "moving") {
  //   strike++;
  // }
  else if (state === "hit") {
    y += batter.dy;
    if (y < 0) {
      y = 470;
      state = "gettingReady";
      ballZoomTimer.start();
      pitcher();
    }
  }
}


// work in progress
// display count in the BOTTOM LEFT <- Mr Schellenbergs idea blame him if it looks bad
// not able to function properly today will try again tomorrow
function theCount(){
  let zoneX1 = width/2 - 100;
  let zoneY1 = height*0.65 - 150;
  let zoneX2 = width/2 + 100;
  let zoneY2 = height*0.65 + 150;
  
  if ((x < zoneX1 || y < zoneY1 || x > zoneX2 || y > zoneY2) && ballSize >= 30) {
    ball ++;
  }
  else {
    if (ballSize > 30) {
      strike ++;
    }
  }
  if (strike === 3) {
    strike = 0;
    out ++;
  }
  if (ball === 4) {
    base ++;
  }
  if (out === 3) {
    finish = true;
  }
  
  textSize(32);
  fill(255, 255, 255, 255);
  text("ball", width*0.025, height*0.91);
  text("strike", width*0.025, height*0.95);
  text(strike, width *0.1, height*0.95);
  text("out", width*0.025, height*0.99);
  text(out, width*0.1, height*0.99);
}
