// scripts/window.js

class AppWindow {
  constructor(appId, title, x, y, w, h, menuHeight, dockHeight) {
    this.appId = appId;
    this.title = title;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.menuHeight = menuHeight;
    this.dockHeight = dockHeight;

    this.titleBarHeight = 32;
    this.radius = 14; // soft, Apple-y corners

    this.isVisible = true;

    // Dragging
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    // Resizing
    this.isResizing = false;
    this.resizeEdges = { right: false, bottom: false };
    this.startMouseX = 0;
    this.startMouseY = 0;
    this.startW = 0;
    this.startH = 0;

    this.minW = 320;
    this.minH = 200;

    // Maximize / zoom
    this.isMaximized = false;
    this.restoreRect = null; // { x, y, w, h }

    // Delayed open
    this.openAt = null;
  }

  hitTest(mx, my) {
    return (
      mx >= this.x && mx <= this.x + this.w &&
      my >= this.y && my <= this.y + this.h
    );
  }

  inTitleBar(mx, my) {
    return (
      mx >= this.x && mx <= this.x + this.w &&
      my >= this.y && my <= this.y + this.titleBarHeight
    );
  }

  trafficLights() {
    const r = 7;
    const cy = this.y + this.titleBarHeight / 2;
    return {
      close:    { x: this.x + 12,      y: cy, r },
      minimize: { x: this.x + 12 + 20, y: cy, r },
      zoom:     { x: this.x + 12 + 40, y: cy, r }
    };
  }

  hitResizeZone(mx, my) {
    const margin = 10;
    const rightEdgeX = this.x + this.w;
    const bottomEdgeY = this.y + this.h;

    const overRight =
      Math.abs(mx - rightEdgeX) <= margin &&
      my >= this.y + this.titleBarHeight &&
      my <= bottomEdgeY;

    const overBottom =
      Math.abs(my - bottomEdgeY) <= margin &&
      mx >= this.x &&
      mx <= rightEdgeX;

    this.resizeEdges.right = overRight;
    this.resizeEdges.bottom = overBottom;

    return overRight || overBottom;
  }

  toggleMaximize() {
    const margin = 8;

    if (!this.isMaximized) {
      this.restoreRect = {
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h
      };

      this.x = margin;
      this.y = this.menuHeight + margin;
      this.w = width - margin * 2;
      this.h = height - this.menuHeight - this.dockHeight - margin * 2;

      this.isMaximized = true;
    } else if (this.restoreRect) {
      this.x = this.restoreRect.x;
      this.y = this.restoreRect.y;
      this.w = this.restoreRect.w;
      this.h = this.restoreRect.h;

      this.isMaximized = false;
      this.restoreRect = null;
    }
  }

  mousePressed(mx, my) {
    const lights = this.trafficLights();

    // Close
    if (dist(mx, my, lights.close.x, lights.close.y) <= lights.close.r) {
      this.isVisible = false;
      return;
    }

    // Zoom / expand
    if (dist(mx, my, lights.zoom.x, lights.zoom.y) <= lights.zoom.r) {
      this.toggleMaximize();
      return;
    }

    // Resize zone (edges / corner)
    if (this.hitResizeZone(mx, my)) {
      this.isResizing = true;
      this.startMouseX = mx;
      this.startMouseY = my;
      this.startW = this.w;
      this.startH = this.h;
      return;
    }

    // Start dragging from title bar
    if (this.inTitleBar(mx, my)) {
      this.isDragging = true;
      this.dragOffsetX = mx - this.x;
      this.dragOffsetY = my - this.y;
    }
  }

  mouseReleased(mx, my) {
    this.isDragging = false;
    this.isResizing = false;
  }

  mouseDragged(mx, my, px, py) {
    if (this.isResizing) {
      const dx = mx - this.startMouseX;
      const dy = my - this.startMouseY;

      if (this.resizeEdges.right) {
        let newW = this.startW + dx;
        newW = max(this.minW, newW);
        newW = min(newW, width - this.x - 16);
        this.w = newW;
      }

      if (this.resizeEdges.bottom) {
        let newH = this.startH + dy;
        newH = max(this.minH, newH);
        newH = min(newH, height - this.y - 120);
        this.h = newH;
      }

      this.isMaximized = false;
      this.restoreRect = null;

      return;
    }

    if (!this.isDragging) return;

    this.x = mx - this.dragOffsetX;
    this.y = my - this.dragOffsetY;

    this.x = constrain(this.x, 8, width - this.w - 8);
    this.y = constrain(this.y, 40, height - this.h - 120);
  }

  draw(isActive) {
    if (!this.isVisible) return;

    push();

    const borderColor = color(176, 178, 186, 220);
    const bodyColor = isActive ? color(245, 245, 248) : color(248, 248, 250);
    const titleColor = isActive ? color(232, 234, 238) : color(238, 239, 243);
    const titleTextColor = isActive ? color(32, 32, 36) : color(128, 129, 135);

    // Window shell with thin grey outline
    stroke(borderColor);
    strokeWeight(0.7);
    fill(bodyColor);
    rect(this.x, this.y, this.w, this.h, this.radius);

    // Flat title bar with its own border so it matches the shell outline
    stroke(borderColor);
    strokeWeight(0.7);
    fill(titleColor);
    rect(
      this.x,
      this.y,
      this.w,
      this.titleBarHeight,
      this.radius,
      this.radius,
      0,
      0
    );
    noStroke();
    fill(borderColor);
    rect(this.x, this.y + this.titleBarHeight - 1, this.w, 1);

    // Traffic lights
    const lights = this.trafficLights();
    this.drawTrafficLight(lights.close, color(255, 95, 86), isActive);
    this.drawTrafficLight(lights.minimize, color(255, 189, 46), isActive);
    this.drawTrafficLight(lights.zoom, color(51, 214, 87), isActive);

    // Title
    fill(titleTextColor);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(this.title, this.x + this.w / 2, this.y + this.titleBarHeight / 2);

    // Content
    this.drawContent();

    pop();
  }

  drawTrafficLight(light, baseColor, isActive) {
    push();
    stroke(214, 214, 220);
    strokeWeight(1);
    const inactive = lerpColor(baseColor, color(230), 0.4);
    fill(isActive ? baseColor : inactive);
    circle(light.x, light.y, light.r * 2);
    pop();
  }

  drawContent() {
    push();
    const padding = 22;
    const contentX = this.x + padding;
    const contentY = this.y + this.titleBarHeight + padding;
    const contentW = this.w - padding * 2;
    let cursorY = contentY;

    textAlign(LEFT, TOP);

    const blocks = this.getContentBlocks();

    for (const block of blocks) {
      const style = this.getBlockStyle(block.type);
      textSize(style.size);
      textStyle(style.weight);
      fill(style.color);
      const lines = this.wrapText(block.text, contentW);

      const lineSpacing = style.leading;
      for (const line of lines) {
        text(line, contentX, cursorY);
        cursorY += lineSpacing;
      }

      const blockSpacing = block.spacing !== undefined ? block.spacing : style.blockSpacing;
      cursorY += blockSpacing;
    }

    pop();
  }

  getBlockStyle(type) {
    switch (type) {
      case "h1":
        return {
          size: 20,
          weight: BOLD,
          color: color(28, 28, 30),
          leading: 26,
          blockSpacing: 10
        };
      case "h2":
        return {
          size: 15,
          weight: BOLD,
          color: color(70, 70, 75),
          leading: 20,
          blockSpacing: 6
        };
      default:
        return {
          size: 13,
          weight: NORMAL,
          color: color(60, 60, 65),
          leading: 18,
          blockSpacing: 12
        };
    }
  }

  wrapText(textValue, maxWidth) {
    const words = textValue.split(" ");
    const lines = [];
    let current = "";

    for (const word of words) {
      const tentative = current ? current + " " + word : word;
      if (textWidth(tentative) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = tentative;
      }
    }

    if (current) lines.push(current);
    return lines;
  }

  getContentBlocks() {
    switch (this.appId) {
      case "finder":
        return [
          { type: "h1", text: "Kevin Ewing" },
          { type: "p", text: "Product-focused engineer mixing clean design with practical full-stack chops." },
          { type: "h2", text: "Currently" },
          { type: "p", text: "Staff Design Engineer @ Somewhere, coaching teams through prototyping and launch." }
        ];
      case "safari":
        return [
          { type: "h1", text: "Open Tabs" },
          { type: "p", text: "• Portfolio redesign", spacing: 4 },
          { type: "p", text: "• ML-powered note system", spacing: 4 },
          { type: "p", text: "• Shader experiments" },
          { type: "h2", text: "Reading" },
          { type: "p", text: "Design Engineering at Apple · 3D on the Web · Humane developer tooling." }
        ];
      case "terminal":
        return [
          { type: "h1", text: "Terminal" },
          { type: "p", text: "npm run ship" },
          { type: "p", text: "Deploying resume desktop to main..." },
          { type: "p", text: "Success ✅" }
        ];
      case "word":
        return [
          { type: "h1", text: "Writing" },
          { type: "p", text: "Documenting patterns for building delightful productivity tooling." },
          { type: "h2", text: "Latest" },
          { type: "p", text: "2024 — Designing native-feeling desktop experiences inside the browser." }
        ];
      case "vscode":
        return [
          { type: "h1", text: "VS Code" },
          { type: "p", text: "Workspace: kevin-desktop" },
          { type: "h2", text: "Focused Files" },
          { type: "p", text: "• scripts/desktop.js", spacing: 4 },
          { type: "p", text: "• scripts/window.js", spacing: 4 },
          { type: "p", text: "• scripts/core.js" }
        ];
      case "xcode":
        return [
          { type: "h1", text: "Xcode" },
          { type: "p", text: "Prototype iOS widgets mirroring this desktop resume." },
          { type: "h2", text: "Build Targets" },
          { type: "p", text: "• ResumeWidget", spacing: 4 },
          { type: "p", text: "• DockMini", spacing: 4 },
          { type: "p", text: "• WallpaperLab" }
        ];
      case "blender":
        return [
          { type: "h1", text: "Blender" },
          { type: "p", text: "Concept scenes for interactive case studies and dock icons." },
          { type: "h2", text: "Scenes" },
          { type: "p", text: "DeskSetup.blend · DockIconSet.blend" }
        ];
      default:
        return [
          { type: "h1", text: this.title },
          { type: "p", text: "This app is still under construction. Check back soon." }
        ];
    }
  }
}
