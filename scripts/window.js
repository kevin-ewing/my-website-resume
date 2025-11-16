// scripts/window.js

class AppWindow {
  constructor(appId, title, x, y, w, h, menuHeight, dockHeight, dockRef = null, options = {}) {
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

    this.lastTitleBarClick = 0;
    this.titleDoubleClickDelay = 300;

    // Dragging
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    // Resizing
    this.isResizing = false;
    this.resizeEdges = { right: false, left: false, bottom: false };
    this.startMouseX = 0;
    this.startMouseY = 0;
    this.startW = 0;
    this.startH = 0;
    this.startX = 0;

    this.minW = 320;
    this.minH = 200;

    // Maximize / zoom
    this.isMaximized = false;
    this.restoreRect = null; // { x, y, w, h }

    // Delayed open / minimize
    this.openAt = null;
    this.isMinimized = false;
    this.isClosed = false;
    this.isMinimizing = false;
    this.isRestoring = false;
    this.transitionDuration = 220;
    this.transition = null;

    this.dockRef = dockRef;
    this.customBlocks = options.customBlocks || null;
    this.closeOnMinimize = !!options.closeOnMinimize;
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

  resizeEdgesFor(mx, my) {
    const margin = 10;
    const rightEdgeX = this.x + this.w;
    const bottomEdgeY = this.y + this.h;

    const overRight =
      Math.abs(mx - rightEdgeX) <= margin &&
      my >= this.y + this.titleBarHeight &&
      my <= bottomEdgeY;

    const overLeft =
      Math.abs(mx - this.x) <= margin &&
      my >= this.y + this.titleBarHeight &&
      my <= bottomEdgeY;

    const overBottom =
      Math.abs(my - bottomEdgeY) <= margin &&
      mx >= this.x &&
      mx <= rightEdgeX;

    return {
      right: overRight,
      left: overLeft,
      bottom: overBottom
    };
  }

  hitResizeZone(mx, my) {
    const edges = this.resizeEdgesFor(mx, my);

    this.resizeEdges.right = edges.right;
    this.resizeEdges.left = edges.left;
    this.resizeEdges.bottom = edges.bottom;

    return edges.right || edges.left || edges.bottom;
  }

  toggleMaximize() {
    const margin = 0;

    if (!this.isMaximized) {
      this.restoreRect = {
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h
      };

      this.x = margin;
      this.y = this.menuHeight;
      this.w = width - margin * 2;
      this.h = height - this.menuHeight - this.dockHeight;

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
      this.handleClose();
      return;
    }

    // Minimize
    if (dist(mx, my, lights.minimize.x, lights.minimize.y) <= lights.minimize.r) {
      this.minimize();
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
      this.startX = this.x;
      return;
    }

    const now = millis();

    // Start dragging from title bar (and handle double-click zoom)
    if (this.inTitleBar(mx, my)) {
      if (now - this.lastTitleBarClick <= this.titleDoubleClickDelay) {
        this.toggleMaximize();
        this.lastTitleBarClick = 0;
        this.isDragging = false;
        return;
      }

      this.lastTitleBarClick = now;
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

      if (this.resizeEdges.left) {
        const rightEdge = this.startX + this.startW;
        let newX = this.startX + dx;
        const maxX = rightEdge - this.minW;
        newX = constrain(newX, 0, maxX);
        let newW = rightEdge - newX;
        newW = max(this.minW, newW);
        newW = min(newW, width - newX);
        this.x = newX;
        this.w = newW;
      }

      if (this.resizeEdges.right) {
        let newW = this.startW + dx;
        newW = max(this.minW, newW);
        newW = min(newW, width - this.x);
        this.w = newW;
      }

      if (this.resizeEdges.bottom) {
        let newH = this.startH + dy;
        newH = max(this.minH, newH);
        newH = min(newH, height - this.y - this.dockHeight);
        this.h = newH;
      }

      this.isMaximized = false;
      this.restoreRect = null;

      return;
    }

    if (!this.isDragging) return;

    this.x = mx - this.dragOffsetX;
    this.y = my - this.dragOffsetY;

    const maxX = max(0, width - this.w);
    const maxY = max(this.menuHeight, height - this.h - this.dockHeight);
    this.x = constrain(this.x, 0, maxX);
    this.y = constrain(this.y, this.menuHeight, maxY);
  }

  adjustToViewport(viewportW, viewportH, dockHeight) {
    if (viewportW <= 0 || viewportH <= 0) return;

    this.dockHeight = dockHeight;
    const usableWidth = max(140, viewportW);
    if (this.w > usableWidth) {
      this.w = usableWidth;
    }
    const maxX = max(0, viewportW - this.w);
    this.x = constrain(this.x, 0, maxX);

    const usableHeight = max(
      140,
      viewportH - dockHeight - this.menuHeight
    );
    if (this.h > usableHeight) {
      this.h = usableHeight;
    }
    const maxY = max(
      this.menuHeight,
      viewportH - dockHeight - this.h
    );
    this.y = constrain(this.y, this.menuHeight, maxY);
  }

  draw(isActive) {
    if (!this.isVisible && !this.transition) return;

    const transitionState = this.computeTransitionTransform();
    if (!this.isVisible && !transitionState) {
      return;
    }

    push();
    let alphaPushed = false;
    if (transitionState) {
      translate(transitionState.x, transitionState.y);
      scale(transitionState.scale);
      translate(-this.x, -this.y);
      drawingContext.save();
      drawingContext.globalAlpha *= transitionState.alpha;
      alphaPushed = true;
      isActive = false;
    }

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
    const showLightGlyphs = this.isHoveringTrafficLights(mouseX, mouseY);
    this.drawTrafficLight(lights.close, color(255, 95, 86), isActive, showLightGlyphs, "close");
    this.drawTrafficLight(lights.minimize, color(255, 189, 46), isActive, showLightGlyphs, "minimize");
    this.drawTrafficLight(lights.zoom, color(51, 214, 87), isActive, showLightGlyphs, "zoom");

    // Title
    fill(titleTextColor);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(this.title, this.x + this.w / 2, this.y + this.titleBarHeight / 2);

    // Content
    this.drawContent();

    if (alphaPushed) {
      drawingContext.restore();
    }
    pop();
  }

  drawTrafficLight(light, baseColor, isActive, showGlyph, glyphType) {
    push();
    stroke(214, 214, 220, 120);
    strokeWeight(1);
    const inactive = lerpColor(baseColor, color(230), 0.4);
    const fillColor = isActive ? baseColor : inactive;
    fillColor.setAlpha(showGlyph ? 200 : 130);
    fill(fillColor);
    circle(light.x, light.y, light.r * 2);

    if (showGlyph) {
      this.drawLightGlyph(light, glyphType);
    }

    pop();
  }

  drawLightGlyph(light, type) {
    push();
    stroke(55, 55, 60, 170);
    strokeWeight(1.5);
    strokeCap(ROUND);
    noFill();
    const inset = light.r - 4;

    switch (type) {
      case "close":
        line(light.x - inset, light.y - inset, light.x + inset, light.y + inset);
        line(light.x - inset, light.y + inset, light.x + inset, light.y - inset);
        break;
      case "minimize":
        line(light.x - inset, light.y, light.x + inset, light.y);
        break;
      case "zoom":
        line(light.x - inset, light.y, light.x + inset, light.y);
        line(light.x, light.y - inset, light.x, light.y + inset);
        break;
    }

    pop();
  }

  isHoveringTrafficLights(mx, my) {
    const lights = this.trafficLights();
    return (
      dist(mx, my, lights.close.x, lights.close.y) <= lights.close.r ||
      dist(mx, my, lights.minimize.x, lights.minimize.y) <= lights.minimize.r ||
      dist(mx, my, lights.zoom.x, lights.zoom.y) <= lights.zoom.r
    );
  }

  minimize() {
    if (this.closeOnMinimize) {
      this.handleClose();
      return;
    }

    if ((!this.isVisible && !this.isMinimized) || this.isMinimizing) return;
    this.cancelTransition();
    this.isMinimized = true;
    this.isRestoring = false;
    this.openAt = null;
    this.isVisible = true;

    const target = this.getMinimizeTarget();
    if (target) {
      this.startMinimizeAnimation(target);
      return;
    }

    this.isVisible = false;
  }

  getMinimizeTarget() {
    if (!this.dockRef || !this.appId) return null;
    return this.dockRef.getIconCenter(this.appId);
  }

  buildTargetRect(target) {
    if (!target) return null;
    const baseSize = target.size ? target.size : this.w * 0.12;
    const scale = constrain(baseSize / this.w, 0.06, 0.25);
    const widthScaled = this.w * scale;
    const heightScaled = this.h * scale;
    return {
      x: target.x - widthScaled / 2,
      y: target.y - heightScaled / 2,
      w: widthScaled,
      h: heightScaled
    };
  }

  startMinimizeAnimation(target) {
    const toRect = this.buildTargetRect(target);
    if (!toRect) {
      this.isVisible = false;
      return;
    }

    this.isMinimizing = true;
    this.transition = {
      kind: "minimize",
      start: millis(),
      duration: this.transitionDuration,
      from: { x: this.x, y: this.y, w: this.w, h: this.h, alpha: 1 },
      to: { ...toRect, alpha: 0 }
    };
  }

  startRestoreAnimation(target) {
    const fromRect = this.buildTargetRect(target);
    if (!fromRect) {
      this.isVisible = true;
      this.isMinimized = false;
      return;
    }

    this.isRestoring = true;
    this.isMinimized = false;
    this.isVisible = true;
    this.transition = {
      kind: "restore",
      start: millis(),
      duration: this.transitionDuration,
      from: { ...fromRect, alpha: 0 },
      to: { x: this.x, y: this.y, w: this.w, h: this.h, alpha: 1 }
    };
  }

  restoreFromDock() {
    this.cancelTransition();
    const target = this.getMinimizeTarget();
    if (target) {
      this.startRestoreAnimation(target);
    } else {
      this.isMinimized = false;
      this.isVisible = true;
    }
  }

  handleClose() {
    this.cancelTransition(false);
    this.isClosed = true;
    this.isVisible = false;
    this.isMinimized = false;
    this.openAt = null;
  }

  cancelTransition(keepVisible = true) {
    this.transition = null;
    this.isMinimizing = false;
    this.isRestoring = false;
    if (keepVisible) {
      this.isVisible = true;
    }
  }

  computeTransitionTransform() {
    if (!this.transition) return null;
    const { kind, start, duration, from, to } = this.transition;
    const elapsed = millis() - start;
    const t = constrain(elapsed / duration, 0, 1);
    const eased = this.easeInOutCubic(t);
    const x = lerp(from.x, to.x, eased);
    const y = lerp(from.y, to.y, eased);
    const w = lerp(from.w, to.w, eased);
    const scale = w / this.w;
    const alpha = lerp(from.alpha, to.alpha, eased);

    if (t >= 1) {
      this.transition = null;
      this.isMinimizing = false;
      this.isRestoring = false;
      if (kind === "minimize") {
        this.isVisible = false;
      } else if (kind === "restore") {
        this.isVisible = true;
        this.isMinimized = false;
      }
      return null;
    }

    return { x, y, scale, alpha };
  }

  easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - pow(-2 * t + 2, 3) / 2;
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
    if (this.customBlocks) {
      return this.customBlocks;
    }
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
