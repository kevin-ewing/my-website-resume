// scripts/core.js

let desktop;
let ICON_IMAGES = {};

function preload() {
  // Dock icons
  ICON_IMAGES.finder   = loadImage("resources/icons/finder.png");
  ICON_IMAGES.safari   = loadImage("resources/icons/safari.png");
  ICON_IMAGES.terminal = loadImage("resources/icons/terminal.png");
  ICON_IMAGES.word     = loadImage("resources/icons/word.png");
  ICON_IMAGES.vscode   = loadImage("resources/icons/vscode.png");
  ICON_IMAGES.rstudio    = loadImage("resources/icons/rstudio.png");
  ICON_IMAGES.blender  = loadImage("resources/icons/blender.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(window.devicePixelRatio || 1);
  textFont("SF Pro Text"); // from your fonts.css
  desktop = new Desktop();
}

function draw() {
  if (!desktop) return;
  desktop.update();
  desktop.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (desktop) desktop.onResize();
}

function mousePressed() {
  if (desktop) desktop.mousePressed(mouseX, mouseY);
}

function mouseReleased() {
  if (desktop) desktop.mouseReleased(mouseX, mouseY);
}

function mouseDragged() {
  if (desktop) desktop.mouseDragged(mouseX, mouseY, pmouseX, pmouseY);
}
