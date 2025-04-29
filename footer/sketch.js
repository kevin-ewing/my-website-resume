const WINDOW_HEIGHT = 300

var bkgdColor, textColor, strokeColor;
var colorSet = [];

var inputText = [];
var tFont;
var tFontData;
var myFont;
var tFontFactor;
var starterText = "Contact Me";

var pgTextSize = 100;
var res = 8;

var culmLength = [];
var coreBase;
var baseAnimA = 80;
var animA = 80;     ////// INTRO
var baseAnimB = 0;
var animB = animA;     ////// STAY
var baseAnimC = 80;
var animC = animB + 80;     ////// OUTRO
var maxDelay = -20;

var stageAdirect = 2;
var stageAstrength = 3;

var stageBdirect = 2;
var stageBstrength = 3;

var wWindowMin, wWindowMax;
var scaler = 0.6;

var fullW, fullH;

var tumbleDepthLength = -75;
var tumbleAmount = .4;

var mouseCenter;
var maxDist = 100;

var capsOnToggle = true;
var strokeOnToggle = true;
var strokeW = 1.1;

var saveMode = 0;

var cwidth, cheight
var recMessageOn = false;
var frate = 30;
var recordedFrames = 0;
var numFrames = 300;

var thisDensity = 1;

let camPos;

function preload() {
  tFont = loadFont("resources/FormulaCondensed-Bold.otf");
  tFontData = loadBytes("resources/FormulaCondensed-Bold.otf");
  tFontFactor = 0.82;
}

function setup() {
  createCanvas(windowWidth, WINDOW_HEIGHT, WEBGL);

  thisDensity = pixelDensity();

  cwidth = width;
  cheight = height;

  mouseCenter = createVector(0, 0);
  camPos = createVector(0, 0);

  myFont = opentype.parse(tFontData.bytes.buffer);

  wWindowMin = width / 8,
    wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  textColor = color('#ffffff');
  strokeColor = color('#000000');
  bkgdColor = color('#000000');

  colorSet[0] = color('#dee3e2');
  colorSet[1] = color('#fccbcb');
  colorSet[2] = color('#78b3d6');
  colorSet[3] = color('#d86969');
  colorSet[4] = color('#4f7969');


  frameRate(frate);
  curveDetail(res);

  strokeJoin(ROUND);
  strokeCap(ROUND);
  rectMode(CENTER);
  setText();
}

function draw() {
  // ortho();
  perspective();

  background(bkgdColor);

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let targetX = map(mouseX, 0, width, -200, 200);
    let targetY = map(mouseY, 0, height, -200, 200);
    camPos.x = lerp(camPos.x, targetX, 0.05);
    camPos.y = lerp(camPos.y, targetY, 0.05);
  }
  camera(-camPos.x, -camPos.y, height / 2.0 / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  push();
  coreBase.run();
  pop();
}

function quadLerp(p0, p1, p2, t) {
  return ((1 - t) * (1 - t)) * p0 + 2 * ((1 - t) * t * p1) + t * t * p2;
}

function windowResized() {
  resizeForPreview();
}

function resizeForPreview() {
  var tempWidth, tempHeight;

  resizeCanvas(windowWidth, WINDOW_HEIGHT, WEBGL);

  cwidth = width;
  cheight = height;

  wWindowMin = width / 8,
    wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}
