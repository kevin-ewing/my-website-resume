var bkgdColor, textColor, strokeColor, sideSolidColor;
var colorSet = [];

var inputText = [];
var tFont = [];
var tFontData = [];
var myFont = [];
var tFontFactor = [];
var starterText = "Kevin Ewing\nSoftware\nEngineer";

var pgTextSize = 100;
var res = 8;
var pauseLength = 100;
var fontCount = 1;

var culmLength = [];
var coreBase;
var baseAnimA = 60;
var animA = 60;     ////// INTRO
var baseAnimB = 0;
var animB = animA;     ////// STAY
var baseAnimC = 60;
var animC = animB + 60;     ////// OUTRO
var maxDelay = -20;

var stageAdirect = 2;
var stageAstrength = 3;

var stageBdirect = 2;
var stageBstrength = 3;

var wWindowMin, wWindowMax;
var scaler = 0.6;

var fullW, fullH;

var extrudeType = 0;
var tumbleDepthLength = -75;
var tumbleAmount = .4;
var zoomDepthLength = -500;
var punchDepthLength = -50;
var punchDistance = 100;
var punchInvert = false;

var mouseCenterOnToggle = false;
var mouseCenter;
var maxDist = 100;

var orbitOnToggle = false;
var capsOnToggle = true;
var strokeOnToggle = true;
var strokeW = 1.1;

var sidesType = 2;
var alignMode = 1;

let enableOrbit = true;

var saveMode = 0;

var cwidth, cheight
var recMessageOn = false;
var frate = 30;
var recordedFrames = 0;
var numFrames = 300;

var thisDensity = 1;
var selFont = 0;

function preload(){
  tFont[0] = loadFont("boost_resources/FormulaCondensed-Bold.otf");
  tFontData[0] = loadBytes("boost_resources/FormulaCondensed-Bold.otf");
  tFontFactor[0] = 0.82;
}

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  thisDensity = pixelDensity();

  cwidth = width;
  cheight = height;

  mouseCenter = createVector(0, 0);

  for(var m = 0; m < fontCount; m++){
    myFont[m] = opentype.parse(tFontData[m].bytes.buffer);
  }

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  textColor = color('#ffffff');
  strokeColor = color('#000000');
  bkgdColor = color('#000000');
  sideSolidColor = color('#f26666');

  colorSet[0] = color('#ffffff');
  colorSet[1] = color('#4e7cd9');
  colorSet[2] = color('#02733e');
  colorSet[3] = color('#f23030');
  colorSet[4] = color('#f26666');

  frameRate(frate);
  curveDetail(res);

  strokeJoin(ROUND);
  strokeCap(ROUND);
  rectMode(CENTER);
  setText();
}

function draw(){
  if(extrudeType == 0){
    ortho();
  } else {
    perspective();
  }

  background(bkgdColor);

  if(enableOrbit && orbitOnToggle){
    orbitControl();
  }

  push();
    // noFill();
    // stroke(255, 0, 0);
    // line(0, -500, 0, 500);
    // line(-500, 0, 500,0);
    coreBase.run();
  pop();

  // fill(0,0,255);
  // textSize(20);
  // textFont(tFont[0]);
  // text(round(frameRate()), -width/2 + 50, height/2 - 50);
}

function mousePressed(){
  if(mouseCenterOnToggle && enableOrbit){
    mouseCenter.set(mouseX - width/2, mouseY - height/2);

    coreBase.liveReset();
    coreBase.tickerReset();
  }
}

function quadLerp(p0, p1, p2, t){
  return ((1-t)*(1-t)) * p0 + 2 * ((1-t) * t * p1) + t * t * p2;
}

function windowResized(){
  resizeForPreview();
}

function resizeForPreview(){
  var tempWidth, tempHeight;

  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  } else if(saveMode == 1){
    if(windowWidth > windowHeight * 9/16){
      tempHeight = windowHeight;
      tempWidth = windowHeight * 9/16;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 16/9;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if(saveMode == 2){
    if(windowWidth < windowHeight){
      tempWidth = windowWidth;
      tempHeight = windowWidth;
    } else {
      tempHeight = windowHeight;
      tempWidth = windowHeight;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  }

  cwidth = width;
  cheight = height;

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}

function resizeForSave(){
  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  } else if(saveMode == 1){
    resizeCanvas(1080, 1920, WEBGL);
  } else if(saveMode == 2){
    resizeCanvas(1080, 1080, WEBGL);
  }

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}