let RESOLUTION = 200;
let TRAIL_LENGTH_CAP = 300;
let DELAY_CAP = 1;
let WINDOW_Y_OFFSET = -80;
let LINE_SPACING_MULTIPLIER = 130; // Adjust as needed for spacing between lines
let angle = 0;
let targetAngle = 0;
let targetSpread = 0;
let smoothing = 0.05; // Smoothing factor for momentum
let colors;
let colorPairs;
let lines = ["KEVIN EWING", "SOFTWARE", "ENGINEER"];
let letters = [];
let fonts = [];
let selectedFont;
let fontPaths = [
  "fonts/JosefinSans-Light.ttf",
  "fonts/OpenSans_Condensed-Light.ttf",
  "fonts/OpenSans_Condensed-Regular.ttf",
  "fonts/PlusJakartaSans-Light.ttf",
  "fonts/PlusJakartaSans-Regular.ttf",
  "fonts/Raleway-Bold.ttf",
  "fonts/Raleway-ExtraLight.ttf",
  "fonts/Raleway-Regular.ttf",
  "fonts/ZillaSlab-Medium.ttf",
];
let IDLE_THRESHOLD = 3500;
let lastMouseMoved = 0;
let idleTimer = 0;
let mousePrev;
let noiseScale = 0.1;
let noiseStrength = 0.5;


function preload() {
  for (let path of fontPaths) {
    fonts.push(loadFont(path));
  }
}


function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("landing");
  randomizeFont();
  mousePrev = createVector(mouseX, mouseY);
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
  let totalChars = 0;
  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }
  let lettersIndex = 0;
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    for (let lineLength = 0; lineLength < lines[lineNum].length; lineLength++) {
      let letter = lines[lineNum][lineLength];
      let sizeMultiplier = lineNum != 0 ? 0.8 : 1.1;
      textSize(windowWidth * 0.1 * sizeMultiplier);
      let xOffset = -textWidth(lines[lineNum]) / 2;
      let yOffset = lineNum * sizeMultiplier * LINE_SPACING_MULTIPLIER - LINE_SPACING_MULTIPLIER;
      if (lineNum == 0) {
        yOffset = yOffset - (windowWidth * .025);
      }
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
        sizeMultiplier: sizeMultiplier
      });
      lettersIndex += 1;
    }
  }
  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };
  let observer = new IntersectionObserver(handleIntersection, observerOptions);
  let target = document.querySelector("#landing");
  observer.observe(target);
}


function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loop();
    } else {
      noLoop();
    }
  });
}


function draw() {
  if (document.hidden) {
    return;
  }
  background(BG_COLOR);
  let targetX = mouseX - windowWidth / 2;
  let targetY = mouseY - (windowHeight + WINDOW_Y_OFFSET) / 2;
  if (
    mouseX >= 0 &&
    mouseX <= windowWidth &&
    mouseY >= 0 &&
    mouseY <= windowHeight &&
    (mousePrev.x != mouseX || mousePrev.y != mouseY)
  ) {
    idleTimer = 0;
    lastMouseMoved = millis();
    mousePrev.set(mouseX, mouseY);
  } else {
    idleTimer = millis() - lastMouseMoved;
  }
  if (idleTimer > IDLE_THRESHOLD) {
    let noiseX = map(noise(millis() * 0.0001), 0, 1, 0, (windowHeight + WINDOW_Y_OFFSET));
    let noiseY = map(noise(millis() * 0.0001), 0, 1, 0, windowWidth);
    targetX = noiseX - windowWidth / 2;
    targetY = noiseY - (windowHeight + WINDOW_Y_OFFSET) / 2;
  }
  updateLetters(targetX, targetY);
  let halfWindowWidth = windowWidth / 2;
  let halfWindowHeightOffset = (windowHeight + WINDOW_Y_OFFSET) / 2;
  for (
    let resolutionIndex = 0;
    resolutionIndex < RESOLUTION;
    resolutionIndex++
  ) {
    let stepT = resolutionIndex / (RESOLUTION - 1);
    for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
      let letter = letters[letterIndex];
      let xOffset = letter.xOffset;
      let yOffset = letter.yOffset;
      let stepDistance = letter.spread / RESOLUTION;
      let cosAngle = cos(letter.angle);
      let sinAngle = sin(letter.angle);
      if (resolutionIndex == RESOLUTION - 1) {
        fill("black");
      } else {
        fill(lerpColor(letter.colorPair[0], letter.colorPair[1], stepT));
      }
      textSize(windowWidth * 0.1 * letter.sizeMultiplier);
      text(letter.letter,
         positionX = halfWindowWidth + (cosAngle * letter.spread) / 2 + xOffset + cosAngle * stepDistance * (resolutionIndex - RESOLUTION), 
         halfWindowHeightOffset + (sinAngle * letter.spread) / 2 + yOffset + sinAngle * stepDistance * (resolutionIndex - RESOLUTION));
    }
  }
}


function updateLetters(targetX, targetY) {
  targetAngle = atan2(targetY, targetX);
  let halfWindowWidth = windowWidth / 2;
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
        map(distanceToCenter, 0, halfWindowWidth, 0, TRAIL_LENGTH_CAP),
        0,
        TRAIL_LENGTH_CAP
      ),
      smoothing / 2
    );
    letter.spread = targetSpread;
    letter.delay = map(distanceToLetter, 0, halfWindowWidth, 0, DELAY_CAP);
  }
}


function lerpAngle(currentAngle, targetAngle, dampingFactor) {
  let difference = targetAngle - currentAngle;
  if (difference > PI) {
    difference -= TWO_PI;
  } else if (difference < -PI) {
    difference += TWO_PI;
  }
  let newAngle = currentAngle + difference * dampingFactor;
  if (newAngle > TWO_PI) {
    newAngle -= TWO_PI;
  } else if (newAngle < 0) {
    newAngle += TWO_PI;
  }
  return newAngle;
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


function mousePressed() {
  randomizeFont();
  randomizeColorPairs();
  let lettersIndex = 0;
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    for (let lineLength = 0; lineLength < lines[lineNum].length; lineLength++) {
      let letter = lines[lineNum][lineLength];
      let sizeMultiplier = lineNum != 0 ? 0.8 : 1.1;
      textSize(windowWidth * 0.1 * sizeMultiplier);
      let xOffset = -textWidth(lines[lineNum]) / 2;
      let yOffset = lineNum * sizeMultiplier * LINE_SPACING_MULTIPLIER - LINE_SPACING_MULTIPLIER;
      if (lineNum == 0) {
        yOffset = yOffset - (windowWidth * .015);
      }

      if (lineLength != 0) {
        xOffset =
          letters[lettersIndex - 1].xOffset +
          textWidth(letters[lettersIndex - 1].letter);
      }

      letters[lettersIndex].xOffset = xOffset;
      letters[lettersIndex].yOffset = yOffset;
      letters[lettersIndex].colorPair = colorPairs[lettersIndex];
      lettersIndex += 1;
    }
  }
}


function randomizeFont() {
  currentFont = random(fonts);
  textFont(currentFont);
}


function handleVisibilityChange() {
  if (document.hidden) {
    noLoop();
  } else {
    loop();
  }
}


document.addEventListener("visibilitychange", handleVisibilityChange);
