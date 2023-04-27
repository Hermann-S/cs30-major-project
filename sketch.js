// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
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
  
  // the ball is not inceasing at a visible rate
  ballSize = 15;
  for (let i = 15;i < 30; i++) {
    ballSize += 0.5;
    millis(2000);
  }
  circle(width/2, height*0.65, ballSize);
}

function batting() {

  // bat is not having an effect on the ball
  let d = dist(pitcher.x, pitcher.y, mouseX, mouseY);
  if (d < 15) {
    pitcher.y += 5;
  }
}