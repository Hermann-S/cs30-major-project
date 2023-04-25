// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
}

function stirkeZone() {
  rect(width/2, height*0.65, 200, 300);
}

function pitcher() {
  circle(width/2, height/2, 30);
}