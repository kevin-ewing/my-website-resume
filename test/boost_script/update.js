// Default internal values to replace HTML inputs
let textAreaValue = "Kevin Ewing\nSoftware\nEngineer";
let tumbleSetDisplay = "block";
let zoomSetDisplay = "none";
let punchSetDisplay = "none";
let capsOptionsDisplay = "none";
let strokeOptionsDisplay = "none";
let sidesOptions = { trans: "none", solid: "none", random: "none", texture: "none" };
let widgetDisplay = "block";
let bkgdColorVal = "#ffffff";
let textColorVal = "#000000";
let strokeColorVal = "#000000";
let quintColors = ["#000000", "#000000", "#000000", "#000000", "#000000"];

function setText() {
  var enteredText = textAreaValue;
  inputText = "";
  inputText = enteredText.match(/[^\r\n]+/g);

  if (enteredText == "") {
    print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [" "];
  }

  coreCount = inputText.length;
  findMaxSize();
  createAnimation();
}

function findMaxSize() {
  var leading = 10;
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont[selFont]);
  var longestLine = 0;
  var measurer = 0;

  for (var m = 0; m < inputText.length; m++) {
    var tapeMeasurer = textWidth(inputText[m]);
    if (tapeMeasurer > measurer) {
      longestLine = m;
      measurer = tapeMeasurer;
    }
  }

  var widthTest = wWindow;
  let sizeHolder = 2;
  let holdW = 0;

  while (holdW < widthTest) {
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);
    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;

  var heightTest = (height - 100) - (inputText.length - 1) * leading;
  let holdH = inputText.length * sizeHolder * tFontFactor[selFont];
  while (holdH > heightTest) {
    holdH = inputText.length * sizeHolder * tFontFactor[selFont];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;

  textSize(pgTextSize);
  fullH = inputText.length * pgTextSize * tFontFactor[selFont] + (inputText.length - 1) * leading;
  fullW = textWidth(inputText[longestLine]);
}

function setAlignMode(val) {
  alignMode = val;
  setText();
}

function createAnimation() {
  coreBase = null;
  coreBase = new TumbleBase();
}

function setFont(val) {
  selFont = val;
  setText();
}

function setScaler(val) {
  scaler = map(val, 0, 100, 0.1, 1);
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);
  setText();
}

function setExtrudeType(val) {
  extrudeType = val;

  if (extrudeType == 0) {
    tumbleSetDisplay = "block";
    zoomSetDisplay = "none";
    punchSetDisplay = "none";
  } else if (extrudeType == 1) {
    tumbleSetDisplay = "none";
    zoomSetDisplay = "block";
    punchSetDisplay = "none";
  } else {
    maxDelay = -5;
    stageAstrength = 3;
    stageAdirect = 1;
    tumbleSetDisplay = "none";
    zoomSetDisplay = "none";
    punchSetDisplay = "block";
    coreBase.tickerReset();
  }

  coreBase.liveReset();
}

function setMouseCenterOn() {
  mouseCenterOnToggle = !mouseCenterOnToggle;
  if (!mouseCenterOnToggle) mouseCenter.set(0, 0);
  coreBase.tickerReset();
}

function setTumbleDepthLength(val) {
  tumbleDepthLength = map(val, 0, 100, 0, -150);
  coreBase.liveReset();
}

function setTumbleAmount(val) {
  tumbleAmount = map(val, 0, 100, 0, 2);
  coreBase.liveReset();
}

function setZoomDepthLength(val) {
  zoomDepthLength = map(val, 0, 100, 0, -1000);
  coreBase.liveReset();
}

function setPunchDepthLength(val) {
  punchDepthLength = map(val, 0, 100, 0, -150);
  coreBase.liveReset();
}

function setPunchDistance(val) {
  punchDistance = map(val, 0, 100, 0, 200);
  coreBase.liveReset();
}

function setPunchInvert() {
  punchInvert = !punchInvert;
  coreBase.tickerReset();
}

function setMaxDelay(val) {
  maxDelay = map(val, 0, 100, 0, -90);
  coreBase.tickerReset();
}

function setStageAdirect(val) { stageAdirect = val; }
function setStageAstrength(val) { stageAstrength = val; }
function setStageAlength(val) {
  baseAnimA = round(map(val, 0, 100, 10, 200));
  setAnimStages();
}
function setStageBdirect(val) { stageBdirect = val; }
function setStageBstrength(val) { stageBstrength = val; }
function setStageBlength(val) {
  baseAnimC = round(map(val, 0, 100, 10, 200));
  setAnimStages();
}
function setPauseLength(val) {
  baseAnimB = round(map(val, 0, 100, 0, 100));
  setAnimStages();
}
function setAnimStages() {
  animA = baseAnimA;
  animB = baseAnimA + baseAnimB;
  animC = baseAnimA + baseAnimB + baseAnimC;
}

function setCapsOn() {
  capsOnToggle = !capsOnToggle;
  capsOptionsDisplay = capsOnToggle ? "block" : "none";
}

function setStrokeOn() {
  strokeOnToggle = !strokeOnToggle;
  strokeOptionsDisplay = strokeOnToggle ? "block" : "none";
}

function setStrokeWeight(val) { strokeW = map(val, 0, 100, 0, 10); }
function setForeColor(val) {
  foreColor = color(val);
  for (var m = 0; m < spokes.length; m++) spokes[m].reColor();
}
function setBkgdColor(val) { bkgdColorVal = val; bkgdColor = color(val); }
function setTextColor(val) { textColorVal = val; textColor = color(val); }
function setStrokeColor(val) { strokeColorVal = val; strokeColor = color(val); }
function setSideSolidColor(val) { sideSolidColor = color(val); }

function setOrbitOn() {
  orbitOnToggle = !orbitOnToggle;
  if (!orbitOnToggle) {
    print("RESET VIEW!");
    camera();
  }
}

function setColorSet(index, val) { colorSet[index] = color(val); }

function setSidesType(val) {
  sidesType = val;
  sidesOptions.trans = sidesOptions.solid = sidesOptions.random = sidesOptions.texture = "none";
  if (val === 0) sidesOptions.trans = "block";
  else if (val === 1) sidesOptions.solid = "block";
  else if (val === 2) sidesOptions.random = "block";
  else sidesOptions.texture = "block";
}

function sizeSaveChange(val) {
  saveMode = val;
  resizeForPreview();
}

function hideWidget() {
  widgetOn = !widgetOn;
  widgetDisplay = widgetOn ? "block" : "none";
}
