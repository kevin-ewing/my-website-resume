// scripts/dock.js

class DockIcon {
  constructor(appId, label, x, y, size) {
    this.appId = appId;
    this.label = label;
    this.x = x;              // baseline center X
    this.y = y;              // baseline center Y (no bounce)
    this.size = size;

    this.baseSize = size;

    this.isHovered = false;
    this.isOpen = false;
    this.isActive = false;
    this.tooltipAlpha = 0; // 0..1 lerped

    // Vertical bounce state
    this.isLaunching = false;
    this.launchStart = 0;
    this.launchDuration = 900; // slightly longer for believable bounce
    this.bounceOffset = 0;     // negative = up
    this.bounceCycles = 2.6;
    this.bounceAmplitude = 28;
    this.bounceDamping = 1.35;
  }

  update(isHovered, isOpen, isActive) {
    this.isHovered = isHovered;
    this.isOpen = isOpen;
    this.isActive = isActive;

    this.tooltipAlpha = lerp(this.tooltipAlpha, isHovered ? 1 : 0, 0.22);

    if (this.isLaunching) {
      const elapsed = millis() - this.launchStart;
      const t = elapsed / this.launchDuration;

      if (t >= 1) {
        this.isLaunching = false;
        this.bounceOffset = 0;
      } else {
        this.bounceOffset = this.sampleBounceOffset(t);
      }
    } else {
      this.bounceOffset = 0;
    }
  }

  launchBounce() {
    this.isLaunching = true;
    this.launchStart = millis();
  }

  hitTest(mx, my) {
    const centerY = this.y + this.bounceOffset;
    const half = this.baseSize / 2;
    return (
      mx >= this.x - half && mx <= this.x + half &&
      my >= centerY - half && my <= centerY + half
    );
  }

  draw() {
    push();

    const centerY = this.y + this.bounceOffset;
    translate(this.x, centerY);

    const img = ICON_IMAGES[this.appId];
    if (img) {
      imageMode(CENTER);
      image(img, 0, 0, this.baseSize, this.baseSize);
    } else {
      // Fallback rectangle
      rectMode(CENTER);
      noStroke();
      fill(240);
      rect(0, 0, this.baseSize, this.baseSize, 18);
      fill(0);
      textAlign(CENTER, CENTER);
      text("?", 0, 0);
    }

    pop();

    this.drawIndicator(centerY);

    this.drawTooltip(centerY);
  }

  drawIndicator(centerY) {
    if (!this.isOpen) return;

    push();
    const indicatorY = centerY + this.baseSize / 2 + 4;
    noStroke();
    const diameter = 4;
    const alpha = this.isActive ? 230 : 150;
    fill(248, 249, 253, alpha);
    ellipse(this.x, indicatorY, diameter, diameter);
    pop();
  }

  drawTooltip(centerY) {
    if (this.tooltipAlpha <= 0.02) return;

    push();
    const eased = this.tooltipAlpha;

    const paddingX = 10;
    const paddingY = 6;
    textSize(12);
    const textW = textWidth(this.label);
    const w = textW + paddingX * 2;
    const h = 20;

    const tooltipX = this.x - w / 2;
    const tooltipY = centerY - this.baseSize / 2 - h - 8;

    drawingContext.save();
    drawingContext.globalAlpha = eased;
    noStroke();
    fill(255, 255, 255, 235);
    rect(tooltipX, tooltipY, w, h, h/2);

    fill(29, 29, 31);
    textAlign(CENTER, CENTER);
    text(this.label, this.x, tooltipY + h / 2 + 1);
    drawingContext.restore();

    pop();
  }

  sampleBounceOffset(t) {
    const clamped = constrain(t, 0, 1);
    const envelope = pow(1 - clamped, this.bounceDamping);
    const phase = clamped * PI * this.bounceCycles;
    const sine = sin(phase);
    return -abs(sine) * this.bounceAmplitude * envelope;
  }
}

class Dock {
  constructor(apps, dockHeight) {
    this.apps = apps;
    this.dockHeight = dockHeight; // still used by Desktop for layout bounds
    this.iconSize = 45;           // 75% of original 60
    this.gap = 18;

    // Bar geometry
    this.padX = 24;
    this.padY = 10;
    this.barWidth = 0;
    this.barHeight = 0;
    this.barX = 0;
    this.barY = 0;
    this.cornerRadius = 18;

    this.icons = [];
    this.openAppIds = new Set();
    this.activeAppId = null;
    this.createIcons();
  }

  createIcons() {
    this.icons = [];

    const totalWidth =
      this.apps.length * this.iconSize +
      (this.apps.length - 1) * this.gap;

    this.barWidth = totalWidth + this.padX * 2;
    this.barHeight = this.iconSize + this.padY * 2;

    // Position the bar centered horizontally, a bit above the bottom
    this.barX = width / 2 - this.barWidth / 2;
    this.barY = height - this.barHeight - 16;

    // Icon baseline Y is vertical center of the bar
    const iconY = this.barY + this.barHeight / 2;

    // IMPORTANT: center icons inside the bar, respecting padX
    let x = this.barX + this.padX + this.iconSize / 2;
    for (const app of this.apps) {
      this.icons.push(
        new DockIcon(app.id, app.title, x, iconY, this.iconSize)
      );
      x += this.iconSize + this.gap;
    }
  }

  onResize() {
    this.createIcons();
  }

  update(mx, my) {
    let hovered = null;
    for (let i = this.icons.length - 1; i >= 0; i--) {
      if (this.icons[i].hitTest(mx, my)) {
        hovered = this.icons[i];
        break;
      }
    }

    for (const icon of this.icons) {
      icon.update(
        icon === hovered,
        this.openAppIds.has(icon.appId),
        this.activeAppId === icon.appId
      );
    }
  }

  draw() {
    push();

    // Dock background: only as big as the icons + padding
    stroke(255, 255, 255, 100);
    strokeWeight(1);
    fill(255, 255, 255, 150);
    rect(
      this.barX,
      this.barY,
      this.barWidth,
      this.barHeight,
      this.cornerRadius
    );

    for (const icon of this.icons) {
      icon.draw();
    }

    pop();
  }

  getIconAt(x, y) {
    for (let i = this.icons.length - 1; i >= 0; i--) {
      if (this.icons[i].hitTest(x, y)) {
        return this.icons[i];
      }
    }
    return null;
  }

  setAppStates(openIds, activeId) {
    this.openAppIds = new Set(openIds);
    this.activeAppId = activeId;
  }

  getIconCenter(appId) {
    const icon = this.icons.find(i => i.appId === appId);
    if (!icon) return null;
    return {
      x: icon.x,
      y: icon.y,
      size: icon.baseSize
    };
  }

  getTop() {
    return this.barY;
  }
}
