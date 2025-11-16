// scripts/files.js

class DesktopFileIcon {
  constructor({ id, label, appId, kind = "app", projectId = null }) {
    this.id = id;
    this.label = label;
    this.appId = appId;
    this.kind = kind;
    this.projectId = projectId;
    this.x = 0;
    this.y = 0;
    this.iconWidth = 50;
    this.iconHeight = 64;
    this.hitWidth = 92;
    this.hitHeight = 108;
    this.nx = null;
    this.ny = null;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  hitTest(mx, my) {
    return (
      mx >= this.x - (this.hitWidth - this.iconWidth) / 2 &&
      mx <= this.x + this.iconWidth + (this.hitWidth - this.iconWidth) / 2 &&
      my >= this.y - 6 &&
      my <= this.y - 6 + this.hitHeight
    );
  }

  draw(isSelected, isHovered) {
    push();
    translate(this.x, this.y);

    const labelLines = this.wrapLabel(this.label, this.hitWidth - 22);
    const lineHeight = 14;
    const labelHeight = labelLines.length * lineHeight;
    const labelWidths = labelLines.map(line => textWidth(line));
    const labelWidth = max(labelWidths.length ? labelWidths : [0]) + 14;

    if (isSelected) {
      strokeWeight(1.5);
      stroke(220, 224, 235, 180);
      fill(12, 16, 34, 130);
      rect(
        -6,
        -6,
        this.iconWidth + 12,
        this.iconHeight + 12,
        12
      );
    }

    // Document shape
    noStroke();
    fill(252, 252, 255);
    rect(0, 0, this.iconWidth, this.iconHeight, 18, 18, 12, 12);

    // Header band with uniform rounding
    noStroke();
    fill(229, 236, 250);
    rect(0, 0, this.iconWidth, 16, 18, 18, 0, 0);

    // Simple glyph lines
    stroke(168, 172, 190);
    strokeWeight(1);
    const startY = 22;
    for (let i = 0; i < 4; i++) {
      const lineY = startY + i * 8;
      line(9, lineY, this.iconWidth - 9, lineY);
    }

    // Label background + text
    const textY = this.iconHeight + 9;
    const centerX = this.iconWidth / 2;

    textAlign(CENTER, TOP);
    textSize(11.5);

    if (isSelected) {
      rectMode(CENTER);
      stroke(24, 98, 210, 130);
      strokeWeight(0.7);
      fill(17, 111, 248);
      const pillCenterY = textY + labelHeight / 2 - 1;
      rect(
        centerX,
        pillCenterY,
        labelWidth,
        labelHeight + 2,
        10
      );
      rectMode(CORNER);
      noStroke();
      fill(255);
    } else {
      noStroke();
      fill(242, 243, 247);
    }

    const labelTop = textY;
    let offsetY = labelTop;
    for (const line of labelLines) {
      text(line, centerX, offsetY);
      offsetY += lineHeight;
    }

    pop();
  }

  wrapLabel(label, maxWidth) {
    const words = label.split(" ");
    const lines = [];
    let current = "";

    for (const word of words) {
      const tentative = current ? current + " " + word : word;
      const widthValue = textWidth(tentative);
      if (widthValue > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = tentative;
      }
    }

    if (current) lines.push(current);
    return lines.slice(0, 2);
  }
}

class DesktopFiles {
  constructor(files, menuHeight) {
    this.menuHeight = menuHeight;
    this.icons = files.map(def => new DesktopFileIcon(def));
    for (const icon of this.icons) {
      this.assignRandomPosition(icon);
    }
    this.hoveredId = null;
    this.selectedId = null;
    this.lastClickId = null;
    this.lastClickTime = 0;
    this.doubleClickDelay = 300;
    this.bottomMargin = 30;
    this.leftMargin = 24;
    this.topMargin = this.menuHeight + 16;
    this.draggingIcon = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.lastWidth = width || windowWidth || 0;
    this.lastHeight = height || windowHeight || 0;
    this.lastDockHeight = 0;
  }

  assignRandomPosition(icon) {
    icon.nx = constrain(random(0.55, 0.98), 0, 1);
    icon.ny = constrain(random(0.12, 0.78), 0, 1);
  }

  layout(viewWidth, viewHeight, dockHeight) {
    if (viewWidth <= 0 || viewHeight <= 0 || this.icons.length === 0) return;
    this.lastWidth = viewWidth;
    this.lastHeight = viewHeight;
    this.lastDockHeight = dockHeight;

    const bounds = this.computeBounds(viewWidth, viewHeight, dockHeight);
    const widthRange = bounds.maxX - bounds.minX;
    const heightRange = bounds.maxY - bounds.minY;

    for (const icon of this.icons) {
      if (typeof icon.nx !== "number") this.assignRandomPosition(icon);
      if (typeof icon.ny !== "number") this.assignRandomPosition(icon);
      const x = bounds.minX + (icon.nx || 0.5) * (widthRange || 1);
      const y = bounds.minY + (icon.ny || 0.5) * (heightRange || 1);
      icon.setPosition(
        constrain(x, bounds.minX, bounds.maxX),
        constrain(y, bounds.minY, bounds.maxY)
      );
    }
  }

  update(mx, my) {
    this.hoveredId = null;
    if (mx === undefined || my === undefined) return;

    for (const icon of this.icons) {
      if (icon.hitTest(mx, my)) {
        this.hoveredId = icon.id;
        break;
      }
    }
  }

  draw() {
    for (const icon of this.icons) {
      const isHovered = this.hoveredId === icon.id;
      const isSelected = this.selectedId === icon.id;
      icon.draw(isSelected, isHovered);
    }
  }

  pointerDown(mx, my, viewWidth, viewHeight, dockHeight) {
    const icon = this.getIconAt(mx, my);
    if (!icon) {
      this.selectedId = null;
      return null;
    }

    const now = millis();
    const isDoubleClick =
      this.lastClickId === icon.id &&
      now - this.lastClickTime <= this.doubleClickDelay;

    this.selectedId = icon.id;
    this.lastClickId = icon.id;
    this.lastClickTime = now;
    this.draggingIcon = icon;
    this.dragOffsetX = mx - icon.x;
    this.dragOffsetY = my - icon.y;
    this.lastWidth = viewWidth;
    this.lastHeight = viewHeight;
    this.lastDockHeight = dockHeight;

    if (isDoubleClick) {
      this.draggingIcon = null;
      this.lastClickTime = 0;
      if (icon.kind === "project" && icon.projectId) {
        return {
          type: "openProject",
          projectId: icon.projectId
        };
      }
      if (icon.appId) {
        return {
          type: "openApp",
          appId: icon.appId
        };
      }
      return null;
    }

    return { type: "select", id: icon.id };
  }

  pointerDrag(mx, my) {
    if (!this.draggingIcon) return;
    const icon = this.draggingIcon;
    const viewWidth = this.lastWidth || width;
    const viewHeight = this.lastHeight || height;
    const dockHeight = this.lastDockHeight || 0;
    const bounds = this.computeBounds(viewWidth, viewHeight, dockHeight);

    let newX = mx - this.dragOffsetX;
    let newY = my - this.dragOffsetY;
    newX = constrain(newX, bounds.minX, bounds.maxX);
    newY = constrain(newY, bounds.minY, bounds.maxY);
    icon.x = newX;
    icon.y = newY;

    const widthRange = bounds.maxX - bounds.minX || 1;
    const heightRange = bounds.maxY - bounds.minY || 1;
    icon.nx = constrain((icon.x - bounds.minX) / widthRange, 0, 1);
    icon.ny = constrain((icon.y - bounds.minY) / heightRange, 0, 1);
  }

  pointerUp() {
    this.draggingIcon = null;
  }

  isDragging() {
    return !!this.draggingIcon;
  }

  computeBounds(viewWidth, viewHeight, dockHeight) {
    const iconRef = this.icons[0];
    const iconWidth = iconRef ? iconRef.iconWidth : 64;
    const iconHeight = iconRef ? iconRef.iconHeight : 76;
    const minX = this.leftMargin;
    const maxX = max(minX, viewWidth - this.leftMargin - iconWidth);
    const minY = this.menuHeight + 16;
    const maxY = max(
      minY,
      viewHeight - dockHeight - this.bottomMargin - iconHeight
    );
    return { minX, maxX, minY, maxY };
  }

  getIconAt(mx, my) {
    for (let i = this.icons.length - 1; i >= 0; i--) {
      if (this.icons[i].hitTest(mx, my)) {
        return this.icons[i];
      }
    }
    return null;
  }
}
