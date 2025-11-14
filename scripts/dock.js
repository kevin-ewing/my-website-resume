// scripts/dock.js

class DockIcon {
  constructor(appId, label, x, y, size) {
    this.appId = appId;
    this.label = label;
    this.x = x;              // baseline center X
    this.y = y;              // baseline center Y (no bounce)
    this.size = size;

    this.baseSize = size;
    this.scale = 1;

    this.isHovered = false;

    // Vertical bounce state
    this.isLaunching = false;
    this.launchStart = 0;
    this.launchDuration = 700; // ms ~ two bounces
    this.bounceOffset = 0;     // negative = up
  }

  update(isHovered) {
    this.isHovered = isHovered;

    if (this.isLaunching) {
      const elapsed = millis() - this.launchStart;
      const t = elapsed / this.launchDuration;

      if (t >= 1) {
        this.isLaunching = false;
        this.bounceOffset = 0;
      } else {
        // Two vertical bounces, decaying amplitude
        const bounces = 2;
        const angle = t * TWO_PI * bounces;
        const amp = 18; // pixels
        const sine = sin(angle);
        // Only bounce upward from baseline, fade out over time
        this.bounceOffset = -abs(sine) * amp * (1 - t);
      }
    } else {
      this.bounceOffset = 0;
    }

    // No scaling on hover or click — keep at 1
    this.scale = 1;
  }

  launchBounce() {
    this.isLaunching = true;
    this.launchStart = millis();
  }

  hitTest(mx, my) {
    const centerY = this.y + this.bounceOffset;
    const half = (this.baseSize * this.scale) / 2;
    return (
      mx >= this.x - half && mx <= this.x + half &&
      my >= centerY - half && my <= centerY + half
    );
  }

  draw() {
    push();

    const centerY = this.y + this.bounceOffset;
    translate(this.x, centerY);
    scale(this.scale);

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

    if (this.isHovered) {
      this.drawTooltip(centerY);
    }

    pop();
  }

  drawTooltip(centerY) {
    push();

    const paddingX = 10;
    const paddingY = 6;
    textSize(12);
    const textW = textWidth(this.label);
    const w = textW + paddingX * 2;
    const h = 26;

    const tooltipX = this.x - w / 2;
    const tooltipY = centerY - this.baseSize / 2 - h - 8;

    // Shadow
    noStroke();
    fill(0, 0, 0, 60);
    rect(tooltipX + 2, tooltipY + 3, w, h, 8);

    // Background
    fill(255, 255, 255, 235);
    rect(tooltipX, tooltipY, w, h, 8);

    // Text
    fill(29, 29, 31);
    textAlign(CENTER, CENTER);
    text(this.label, this.x, tooltipY + h / 2 + 1);

    pop();
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

    this.icons = [];
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
        break;w
      }
    }

    for (const icon of this.icons) {
      icon.update(icon === hovered);
    }
  }

  draw() {
    push();

    // Dock background: only as big as the icons + padding
    noStroke();
    fill(255, 255, 255, 190);
    rect(this.barX, this.barY, this.barWidth, this.barHeight, this.barHeight / 2);

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
}
