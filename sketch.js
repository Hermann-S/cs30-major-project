// MLB the Show
// Hermann Stirrett
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballState = "gettingReady";
let batState = "light";
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
let run = 0;
let fifty = ["double", "single"];

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
      batState = "light";
    }
    else if (keyCode ===  50) {
      this.w = 50;
      this.h = 20;
      this.dy = -15;
      batState = "intermediate";
    }
    else if (keyCode === 51) {
      this.w = 30;
      this.h = 15;
      this.dy = -20;
      batState = "power";
    }
  }
}
let batter = new Bat(0, -5);



// function preload() {
//   soundFormats("mp3", "ogg");
//   mySound = loadSound("bat.mp3");
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  // eslint-disable-next-line no-undef
  ballZoomTimer = new Timer(1000);
  ballState = "gettingReady";
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
  scoreBoard();
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  x = width/2;
  // eslint-disable-next-line no-undef
  if (ballZoomTimer.expired() && ballState === "gettingReady") {
    ballSize = 0;
    ballState = "moving";
  }
  
  circle(x, y, ballSize);
  // ballStopTimer.start();
  if (ballSize >= 30 && ballState === "moving") {
    ballZoomTimer.reset();
    ballSize = 0;
    ballState = "gettingReady";
    
  }
  else if (ballState === "hit") {
    // ballSize -= 1;
    ballZoomTimer.pause();
    ballZoomTimer.reset();
    // state = "gettingReady";
  }
  else {
    if (ballState === "moving") {
      ballSize += 0.3;
    }
  }
}


// everything hurts
// ball freezes when near the bat made some improvements but still broken
function batting() {
  batter.display();
  batter.handleKey();
  // power
  if (dist(x, y, mouseX, mouseY) < 10 && ballSize > 25 && mouseIsPressed && batState === "power") {
    ballState = "home run";
    run = base + 1;
    // mySound.play();
  }
  // power
  if (dist(x, y, mouseX, mouseY) < 15 && ballSize > 25 && mouseIsPressed && batState === "power") {
    ballState = "double";

    // mySound.play();
  }
  // intermediate
  if (dist(x, y, mouseX, mouseY) < 5 && ballSize > 25 && mouseIsPressed && batState === "intermediate") {
    ballState = "home run";
    // mySound.play();
  }
  // intermediate
  if (dist(x, y, mouseX, mouseY) < 20 && ballSize > 25 && mouseIsPressed && batState === "intermediate") {
    ballState = random(fifty);
    // mySound.play();
  }
  // light
  if (dist(x, y, mouseX, mouseY) < 5 && ballSize > 25 && mouseIsPressed && batState === "light") {
    ballState = "double";
    // mySound.play();
  }
  // light
  if (dist(x, y, mouseX, mouseY) < 30 && ballSize > 25 && mouseIsPressed && batState === "light") {
    ballState = "single";
    // mySound.play();
  }

  // very broken LMAO
  // else if (dist(x, y, mouseX, mouseY) > 30 && mouseIsPressed && state === "moving") {
  //   strike++;
  // }
  else if (ballState === "home run" || ballState === "double" || ballState === "single") {
    y += batter.dy;
    if (y < 0) {
      y = 470;
      ballState = "gettingReady";
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
  
  textSize(32);
  fill(255, 255, 255, 255);
  text("ball", width*0.025, height*0.91);
  text("strike", width*0.025, height*0.95);
  text(strike, width *0.1, height*0.95);
  text("out", width*0.025, height*0.99);
  text(out, width*0.1, height*0.99);
  
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
}

function scoreBoard() {
  if (y <= 50) {
    run++;
  }
  textSize(32);
  fill(255, 255, 255, 255);
  text("runs", width*0.025, height/4);
}

// instead of using the base variable I should use an array to tell me where the runners are and update their postion on every hit
// I think it would be a good idea to make it reset the count, runners and scoreboard if the outs hit 3