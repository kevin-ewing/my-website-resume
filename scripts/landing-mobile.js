let RESOLUTION = 100;
let TRAIL_LENGTH_CAP = 300;
let DELAY_CAP = 1;
let windowYOffset = -700;
let angle = 0;
let targetAngle = 0;
let targetSpread = 0;
let smoothing = 0.05;
let colors;
let colorPairs;
let lines = ["KEVIN  EWING", "SOFTWARE", "ENGINEER"];
let letters = [];
let fonts = [];
let selectedFont;
let fontPaths = [
  "fonts/JosefinSans-Light.ttf",
  "fonts/OpenSans_Condensed-Regular.ttf",
  "fonts/PlusJakartaSans-Light.ttf",
  "fonts/PlusJakartaSans-Regular.ttf",
];
let noiseScale = 0.1;
let noiseStrength = 0.5;
let lastChangeTime = 0;
let changeInterval = 2000;

function preload() {
  for (let path of fontPaths) {
    fonts.push(loadFont(path));
  }
}


function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight / 2 + 100);
  myCanvas.parent("landing");
  randomizeFont();
  letters = [];
  colors = [
    color("#0364f2"),
    color("#058500"),
    color("#ff4300"),
    color("#eeba00"),
  ];
  randomizeColorPairs();
  BG_COLOR = color("white");
  background(BG_COLOR);
  textAlign(LEFT, CENTER);
  textSize(windowWidth * 0.1);
  noStroke();
  let lineSpacing = 120;
  let totalChars = 0;
  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }
  let lettersIndex = 0;
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    for (let lineLength = 0; lineLength < lines[lineNum].length; lineLength++) {
      let letter = lines[lineNum][lineLength];
      let xOffset = -textWidth(lines[lineNum]) / 2;
      let yOffset = lineNum * lineSpacing - lineSpacing;
      if (lineLength != 0) {
        xOffset =
          letters[lettersIndex - 1].xOffset +
          textWidth(letters[lettersIndex - 1].letter);
      }
      letters.push({
        xOffset: xOffset,
        yOffset: yOffset,
        angle: targetAngle,
        colorPair: colorPairs[lettersIndex],
        letter: letter,
        spread: targetSpread,
        delay: 0,
      });
      lettersIndex += 1;
    }
  }
}


function draw() {
  background(BG_COLOR);
  let noiseX = map(noise(millis() * 0.0001), 0, 1, 0, windowHeight + windowYOffset);
  let noiseY = map(noise(millis() * 0.0001), 0, 1, 0, windowWidth);
  targetX = noiseX - windowWidth / 2;
  targetY = noiseY - (windowHeight + windowYOffset) / 2;
  updateLetters(targetX, targetY);
  for (let resolutionIndex = 0; resolutionIndex < RESOLUTION; resolutionIndex++) {
    let stepT = resolutionIndex / (RESOLUTION - 1);
    for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
      let letter = letters[letterIndex];
      let xOffset = letter.xOffset;
      let yOffset = letter.yOffset;
      let stepDistance = letter.spread / RESOLUTION;
      let positionX =
        windowWidth / 2 +
        (cos(letter.angle) * letter.spread) / 2 +
        xOffset +
        cos(letter.angle) * stepDistance * (resolutionIndex - RESOLUTION);
      let positionY =
        (windowHeight + windowYOffset) / 2 +
        (sin(letter.angle) * letter.spread) / 2 +
        yOffset +
        sin(letter.angle) * stepDistance * (resolutionIndex - RESOLUTION);
      if (resolutionIndex == RESOLUTION - 1) {
        fill("black");
      } else {
        fill(lerpColor(letter.colorPair[0], letter.colorPair[1], stepT));
      }
      text(letter.letter, positionX, positionY);
    }
  }
}


function updateLetters(targetX, targetY) {
  let wCenter = windowWidth / 2;
  let hCenter = (windowHeight + windowYOffset) / 2;
  targetAngle = atan2(targetY, targetX);
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let distanceToCenter = dist(targetX, targetY, 0, 0);
    let distanceToLetter = dist(
      targetX,
      targetY,
      letter.xOffset,
      letter.yOffset
    );
    letter.angle = lerpAngle(letter.angle, targetAngle, smoothing);
    targetSpread = lerp(
      letter.spread,
      constrain(
        map(distanceToCenter, 0, windowWidth / 2, 0, 400),
        0,
        TRAIL_LENGTH_CAP
      ),
      smoothing / 2
    );
    letter.spread = targetSpread;
    letter.delay = map(distanceToLetter, 0, windowWidth / 2, 0, DELAY_CAP);
  }
}


function lerpAngle(a, b, t) {
  let difference = b - a;
  if (difference > PI) {
    difference -= TWO_PI;
  } else if (difference < -PI) {
    difference += TWO_PI;
  }
  return a + difference * t;
}


function randomDifferentColor() {
  let color1, color2;
  do {
    color1 = random(colors);
    color2 = random(colors);
  } while (color1 === color2);
  return [color1, color2];
}


function randomizeColorPairs() {
  colorPairs = [];
  let totalChars = 0;
  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }
  for (let i = 0; i < totalChars; i++) {
    colorPairs.push(randomDifferentColor());
  }
}


function resizeWindow() {
  resizeCanvas(windowWidth, windowHeight);
  draw();
}


function touchStarted() {
  if (millis() - lastChangeTime > changeInterval) {
    setup();
    lastChangeTime = millis();
  }
}


function randomizeFont() {
  currentFont = random(fonts);
  textFont(currentFont);
}
