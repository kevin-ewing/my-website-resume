let RESOLUTION = 200;
let TRAIL_LENGTH = 100;
let angle = 0;
let targetAngle = 0;
let baseSmoothing = 0.3; // Base smoothing factor for momentum
let colors;
let colorPairs;

let fonts = [];
let selectedFont;
let fontPaths = [
  "fonts/JosefinSans-Light.ttf",
  "fonts/LibreBaskerville-Regular.ttf",
  "fonts/OpenSans_Condensed-Light.ttf",
  "fonts/OpenSans_Condensed-Regular.ttf",
  "fonts/PlayfairDisplay-Medium.ttf",
  "fonts/PlusJakartaSans-Light.ttf",
  "fonts/PlusJakartaSans-Regular.ttf",
  "fonts/Raleway-Bold.ttf",
  "fonts/Raleway-ExtraLight.ttf",
  "fonts/Raleway-Regular.ttf",
  "fonts/Sedan-Regular.ttf",
  "fonts/ZillaSlab-Medium.ttf",
];

function preload() {
  for (let path of fontPaths) {
    fonts.push(loadFont(path));
  }
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("landing");
  randomizeFont();

  colors = [
    color("#0364f2"), // Blue
    color("#058500"), // Green
    color("#ff4300"), // Reddish/Orange
    color("#eeba00"), // Yellow
  ];

  randomizeColorPairs();

  BG_COLOR = color(0, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(windowWidth * 0.1);

  noStroke();
}

function draw() {
  background(BG_COLOR);

  let mouseXOffset = mouseX - windowWidth / 2;
  let mouseYOffset = mouseY - windowHeight / 2;
  targetAngle = atan2(mouseYOffset, mouseXOffset);

  let stepDistance = TRAIL_LENGTH / RESOLUTION; // Distance between each text

  for (let i = 0; i < RESOLUTION; i++) {
    let t = i / (RESOLUTION - 1);
    let xOffset = cos(angle) * stepDistance * (i - RESOLUTION / 2);
    let yOffset = sin(angle) * stepDistance * (i - RESOLUTION / 2);
    drawText(
      windowWidth / 2 + xOffset,
      windowHeight / 2 + yOffset,
      t,
      i == RESOLUTION - 1
    );
  }

  // Gradually adjust the angle towards the target angle, ensuring shortest rotation
  angle = lerpAngle(angle, targetAngle, baseSmoothing);
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

function drawText(x, y, t, isLast) {
  textAlign(LEFT, CENTER);
  noStroke();

  let lines = ["KEVIN EWING", "SOFTWARE", "ENGINEER"];
  let lineSpacing = 100; // Adjust as needed for spacing between lines

  for (let i = 0; i < lines.length; i++) {
    let totalWidth = 0;
    for (let j = 0; j < lines[i].length; j++) {
      totalWidth += textWidth(lines[i][j]);
    }
    let startX = x - totalWidth / 2; // Adjust starting x position to center the line

    let currentX = startX;
    for (let j = 0; j < lines[i].length; j++) {
      let colorIndex = (j + i * lines[i].length) % colorPairs.length;
      let txtColor = isLast
        ? color("white")
        : lerpColor(colorPairs[colorIndex][0], colorPairs[colorIndex][1], t);
      fill(txtColor);

      // Calculate distance from mouse to letter
      let letterX = currentX;
      let letterY = y - 135 + i * lineSpacing;
      let distance = dist(mouseX, mouseY, letterX, letterY);

      // Adjust smoothing based on distance
      let smoothing = map(distance, 0, max(windowWidth, windowHeight), 1, 0.1);
      angle = lerpAngle(angle, targetAngle, smoothing);

      text(lines[i][j], currentX, letterY); // Adjust x offset for each character
      currentX += textWidth(lines[i][j]);
    }
  }
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
  let lines = ["KEVIN EWING", "SOFTWARE", "ENGINEER"];

  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }

  for (let i = 0; i < totalChars; i++) {
    colorPairs.push(randomDifferentColor());
  }
}

function resizeWindow() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  randomizeFont();
  randomizeColorPairs();
}

function randomizeFont() {
  currentFont = random(fonts);
  textFont(currentFont);
}
