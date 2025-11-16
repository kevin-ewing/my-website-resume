// scripts/desktop.js

class Desktop {
  constructor() {
    this.menuHeight = 28;
    this.dockHeight = 100;

    this.windows = [];
    this.activeWindow = null;
    this.wallpaperBuffer = null;
    this.wallpaperPalette = null;
    this.wallpaperDirty = true;

    // Map to your real icons (finder.png, safari.png, etc.)
    this.apps = [
      { id: "finder",   title: "Finder" },
      { id: "safari",   title: "Safari" },
      { id: "terminal", title: "Terminal" },
      { id: "word",     title: "Word" },
      { id: "vscode",   title: "VS Code" },
      { id: "rstudio",    title: "RStudio" },
      { id: "blender",  title: "Blender" },
    ];

    this.projects = [
      {
        id: "retro-terminal",
        name: "Retro Terminal",
        summary: "A playful shell simulator with CRT shaders and playful command responses.",
        role: "Design Engineer · Built the full stack prototype in 2 weeks.",
        highlights: [
          "Procedural scanline + bloom pipeline in WebGL",
          "Command router powered by a lightweight DSL",
          "Integrated 'company lore' easter eggs for recruiters"
        ],
        stack: "Three.js, Tone.js, Cloudflare Workers"
      },
      {
        id: "ml-playback",
        name: "ML Playback",
        summary: "Audio-reactive web experience that translates model output into immersive soundscapes.",
        role: "Creative Technologist · Led visual + audio system design.",
        highlights: [
          "Real-time shader composition driven by inference embeddings",
          "Dynamic sound bed layered with WebAudio granular synthesis",
          "On-device caching for buttery demo playback"
        ],
        stack: "WebGL2, WebAudio, TensorFlow.js"
      },
      {
        id: "co-create",
        name: "Co-Create",
        summary: "Multiplayer whiteboard that feels like a native design tool, tuned for sprint workshops.",
        role: "Staff Engineer · Architected sync + presence layers.",
        highlights: [
          "Sub-50ms CRDT sync across large files",
          "Fast fuzzy search palette for dropping patterns",
          "Integrated AI assistant for rapid mock suggestions"
        ],
        stack: "React, Yjs, WASM text engine"
      },
      {
        id: "atelier",
        name: "Atelier",
        summary: "A living style guide that renders 3D brand elements inside web docs.",
        role: "Design Engineer · Created the rendering runtime and author tooling.",
        highlights: [
          "Node-based material editor right in the docs",
          "Drag-to-recolor glyphs with GPU color grading",
          "One-click export to marketing decks"
        ],
        stack: "Svelte, WebGL, mdx"
      }
    ];

    this.topBar = new TopBar(this.menuHeight, "Kevin Desktop");
    this.dock = new Dock(this.apps, this.dockHeight);
    this.cursorStyle = "default";
    this.desktopFiles = new DesktopFiles(
      [
        { id: "retro-terminal", label: "retro-terminal.proj", kind: "project", projectId: "retro-terminal" },
        { id: "ml-playback", label: "ml-playback.proj", kind: "project", projectId: "ml-playback" },
        { id: "co-create", label: "co-create.proj", kind: "project", projectId: "co-create" },
        { id: "atelier", label: "atelier.proj", kind: "project", projectId: "atelier" }
      ],
      this.menuHeight
    );
    this.desktopFiles.layout(width, height, this.getDockClearance());
  }

  onResize() {
    this.dock.onResize();
    const dockClearance = this.getDockClearance();

    for (const win of this.windows) {
      win.adjustToViewport(width, height, dockClearance);
    }

    if (this.desktopFiles) {
      this.desktopFiles.layout(width, height, dockClearance);
    }
  }

  update() {
    this.removeClosedWindows();

    const now = millis();

    // Handle delayed window visibility
    for (const win of this.windows) {
      if (!win.isVisible && win.openAt && now >= win.openAt) {
        win.isVisible = true;
        win.openAt = null;
      }
    }

    this.syncActiveWindow();

    const runningIds = new Set();
    for (const win of this.windows) {
      if (win.isVisible || win.openAt || win.isMinimized) {
        runningIds.add(win.appId);
      }
    }
    const activeId = this.activeWindow ? this.activeWindow.appId : null;

    this.dock.setAppStates(runningIds, activeId);
    this.dock.update(mouseX, mouseY);
    if (this.desktopFiles) {
      this.desktopFiles.update(mouseX, mouseY);
    }
    this.updateCursor();
  }

  removeClosedWindows() {
    if (this.windows.length === 0) return;
    let changed = false;
    this.windows = this.windows.filter(win => {
      if (win.isClosed) {
        changed = true;
        return false;
      }
      return true;
    });
    if (changed && this.activeWindow && this.activeWindow.isClosed) {
      this.activeWindow = null;
      this.topBar.setActiveApp(null);
    }
  }

  draw() {
    this.drawWallpaper();
    this.topBar.draw();
    if (this.desktopFiles) {
      this.desktopFiles.draw();
    }
    this.drawWindows();
    this.dock.draw();
  }

  drawWallpaper() {
    if (!this.wallpaperBuffer || this.wallpaperDirty) {
      this.generateWallpaper();
      this.wallpaperDirty = false;
    }

    push();
    drawingContext.save();
    drawingContext.imageSmoothingEnabled = true;
    image(this.wallpaperBuffer, 0, 0, width, height);
    drawingContext.restore();
    pop();
  }

  generateWallpaper() {
    if (width === 0 || height === 0) return;

    const palette = this.pickWallpaperPalette();
    const baseLayer = createGraphics(width, height);
    const ctx = baseLayer.drawingContext;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(
      palette.baseAngle > 0.5 ? 0 : width,
      height,
      palette.baseAngle > 0.5 ? width : 0,
      0
    );
    for (const stop of palette.baseStops) {
      gradient.addColorStop(stop.pos, stop.color);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const drawBloom = ({
      x,
      y,
      rx,
      ry,
      rotation,
      colors
    }) => {
      ctx.save();
      ctx.translate(x * width, y * height);
      ctx.rotate(rotation);
      const radius = max(rx * width, ry * height);
      const bloomGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      for (const stop of colors) {
        bloomGrad.addColorStop(stop.pos, stop.color);
      }
      ctx.fillStyle = bloomGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * width, ry * height, 0, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    };

    for (const bloom of palette.blooms) {
      drawBloom(bloom);
    }

    const blurred = createGraphics(width, height);
    const bctx = blurred.drawingContext;
    bctx.save();
    bctx.filter = `blur(${palette.blurRadius}px)`;
    bctx.drawImage(baseLayer.canvas, 0, 0);
    bctx.restore();

    this.applyGrain(bctx, palette.grainOpacity);

    this.wallpaperBuffer = blurred;
  }

  applyGrain(ctx, opacity) {
    const density = width * height * 0.001;
    ctx.globalAlpha = opacity;
    for (let i = 0; i < density; i++) {
      const gx = random(width);
      const gy = random(height);
      const shade = random(200, 255);
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${random(0.05, 0.15)})`;
      ctx.fillRect(gx, gy, 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  pickWallpaperPalette() {
    const palettes = [
      {
        baseStops: [
          { pos: 0, color: "#02041a" },
          { pos: 0.4, color: "#0a2f7a" },
          { pos: 0.75, color: "#3e33a8" },
          { pos: 1, color: "#a31b64" }
        ],
        blooms: [
          {
            x: random(0.2, 0.3),
            y: random(0.4, 0.5),
            rx: random(0.35, 0.45),
            ry: random(0.25, 0.32),
            rotation: radians(random(-20, -5)),
            colors: [
              { pos: 0, color: "rgba(255,210,120,0.45)" },
              { pos: 0.5, color: "rgba(255,110,95,0.35)" },
              { pos: 1, color: "rgba(255,110,95,0)" }
            ]
          },
          {
            x: random(0.65, 0.75),
            y: random(0.6, 0.7),
            rx: random(0.45, 0.55),
            ry: random(0.35, 0.42),
            rotation: radians(random(10, 25)),
            colors: [
              { pos: 0, color: "rgba(255,240,150,0.6)" },
              { pos: 0.6, color: "rgba(255,170,66,0.35)" },
              { pos: 1, color: "rgba(255,170,66,0)" }
            ]
          },
          {
            x: random(0.6, 0.75),
            y: random(0.18, 0.28),
            rx: random(0.3, 0.4),
            ry: random(0.22, 0.3),
            rotation: radians(random(-10, 5)),
            colors: [
              { pos: 0, color: "rgba(90,218,255,0.55)" },
              { pos: 0.7, color: "rgba(37,148,255,0.3)" },
              { pos: 1, color: "rgba(37,148,255,0)" }
            ]
          },
          {
            x: random(0.35, 0.45),
            y: random(0.78, 0.88),
            rx: random(0.28, 0.4),
            ry: random(0.2, 0.3),
            rotation: radians(random(0, 15)),
            colors: [
              { pos: 0, color: "rgba(155,78,255,0.35)" },
              { pos: 0.7, color: "rgba(155,78,255,0.15)" },
              { pos: 1, color: "rgba(155,78,255,0)" }
            ]
          }
        ],
        blurRadius: 32,
        baseAngle: random(),
        grainOpacity: 0.08
      },
      {
        baseStops: [
          { pos: 0, color: "#020d34" },
          { pos: 0.45, color: "#05487b" },
          { pos: 0.7, color: "#4c2aa8" },
          { pos: 1, color: "#0fa3c0" }
        ],
        blooms: [
          {
            x: random(0.2, 0.3),
            y: random(0.4, 0.5),
            rx: random(0.4, 0.52),
            ry: random(0.3, 0.36),
            rotation: radians(random(-25, -5)),
            colors: [
              { pos: 0, color: "rgba(255,214,150,0.5)" },
              { pos: 1, color: "rgba(255,105,105,0)" }
            ]
          },
          {
            x: random(0.65, 0.8),
            y: random(0.6, 0.75),
            rx: random(0.35, 0.5),
            ry: random(0.3, 0.38),
            rotation: radians(random(5, 18)),
            colors: [
              { pos: 0, color: "rgba(255,232,130,0.55)" },
              { pos: 1, color: "rgba(255,160,66,0)" }
            ]
          },
          {
            x: random(0.55, 0.7),
            y: random(0.15, 0.25),
            rx: random(0.35, 0.45),
            ry: random(0.25, 0.32),
            rotation: radians(random(-12, 8)),
            colors: [
              { pos: 0, color: "rgba(72,212,255,0.55)" },
              { pos: 1, color: "rgba(0,156,255,0)" }
            ]
          }
        ],
        blurRadius: 38,
        baseAngle: random(),
        grainOpacity: 0.06
      }
    ];

    this.wallpaperPalette = random(palettes);
    return this.wallpaperPalette;
  }

  getDockTop() {
    if (this.dock && typeof this.dock.getTop === "function") {
      return this.dock.getTop();
    }
    return height - this.dockHeight;
  }

  getDockClearance() {
    return height - this.getDockTop();
  }

  getAppFrame(appId, dockClearance = this.getDockClearance()) {
    const dockTop = this.getDockTop();
    const usableHeight = max(200, dockTop - this.menuHeight);

    const clampY = (val, winH) => {
      const maxY = max(this.menuHeight, dockTop - winH);
      return constrain(val, this.menuHeight, maxY);
    };

    switch (appId) {
      case "finder": {
        const w = min(420, width * 0.4);
        const h = min(360, usableHeight * 0.55);
        const x = 32;
        const y = clampY(this.menuHeight + 24, h);
        return { x, y, w, h };
      }
      case "safari": {
        const sidePad = max(60, width * 0.08);
        const w = max(640, width - sidePad * 2);
        const h = usableHeight;
        const x = (width - w) / 2;
        const y = this.menuHeight;
        return { x, y, w, h };
      }
      case "terminal": {
        const w = min(480, width * 0.4);
        const h = min(280, usableHeight * 0.45);
        const x = max(20, width - w - 48);
        const y = clampY(this.menuHeight + 48, h);
        return { x, y, w, h };
      }
      default: {
        const minW = min(520, width - 140);
        const maxW = max(minW, width - 80);
        const w = constrain(random(minW, maxW), 360, width - 40);
        const minH = min(320, usableHeight - 30);
        const maxH = max(minH, usableHeight);
        const h = constrain(random(minH, maxH), 260, usableHeight);
        const x = constrain(width / 2 - w / 2 + random(-120, 120), 0, width - w);
        const y = clampY(this.menuHeight + random(20, 80), h);
        return { x, y, w, h };
      }
    }
  }

  drawWindows() {
    for (const win of this.windows) {
      if (win.isVisible) {
        win.draw(win === this.activeWindow);
      }
    }
  }

  getTopWindowAt(x, y) {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      const w = this.windows[i];
      if (
        w.isVisible &&
        !w.isMinimizing &&
        !w.isRestoring &&
        w.hitTest(x, y)
      ) {
        return w;
      }
    }
    return null;
  }

  getCursorTarget(mx, my) {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      const win = this.windows[i];
      if (!win.isVisible || win.isMinimizing || win.isRestoring) continue;

      if (!win.hitTest(mx, my)) continue;

      const resizeEdges = win.resizeEdgesFor(mx, my);
      if (resizeEdges.right || resizeEdges.left || resizeEdges.bottom) {
        return { type: "resize", win, edges: resizeEdges };
      }

      if (win.inTitleBar(mx, my) && !win.isHoveringTrafficLights(mx, my)) {
        return { type: "title", win };
      }
      return { type: "window", win };
    }
    return null;
  }

  cursorForResize(edges) {
    if (edges.right && edges.bottom) return "nwse-resize";
    if (edges.left && edges.bottom) return "nesw-resize";
    if (edges.right || edges.left) return "ew-resize";
    if (edges.bottom) return "ns-resize";
    return "default";
  }

  updateCursor() {
    let desired = "default";

    if (this.activeWindow && this.activeWindow.isResizing) {
      desired = this.cursorForResize(this.activeWindow.resizeEdges);
    }

    if (desired === "default") {
      const target = this.getCursorTarget(mouseX, mouseY);
      if (target) {
        if (target.type === "resize") {
          desired = this.cursorForResize(target.edges);
        }
      }
    }

    if (desired !== this.cursorStyle) {
      cursor(desired);
      this.cursorStyle = desired;
    }
  }

  bringToFront(win) {
    const idx = this.windows.indexOf(win);
    if (idx >= 0) {
      this.windows.splice(idx, 1);
      this.windows.push(win);
    }
    this.activeWindow = win;
    this.topBar.setActiveApp(win ? win.title : null);
  }

  openApp(appId) {
    this.removeClosedWindows();

    let existing = this.windows.find(w => w.appId === appId);
    const delay = random(150, 450); // fake "loading" time
    const dockClearance = this.getDockClearance();

    if (existing) {
      existing.dockHeight = dockClearance;
      if (existing.isMinimized) {
        existing.openAt = null;
        existing.restoreFromDock();
        this.bringToFront(existing);
        return;
      }
      if (existing.isVisible) {
        this.bringToFront(existing);
        return;
      }
      if (existing.openAt && millis() < existing.openAt) {
        return;
      }
      existing.isVisible = false;
      existing.openAt = millis() + delay;
      this.bringToFront(existing);
      return;
    }

    const frame = this.getAppFrame(appId, dockClearance);
    const { x, y, w, h } = frame;

    const app = this.apps.find(a => a.id === appId);
    const title = app ? app.title : "Window";

    const win = new AppWindow(
      appId,
      title,
      x,
      y,
      w,
      h,
      this.menuHeight,
      dockClearance,
      this.dock
    );

    win.isVisible = false;
    win.openAt = millis() + delay;

    this.windows.push(win);
    this.bringToFront(win);
  }

  openProjectWindow(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const appId = `project-${project.id}`;
    let existing = this.windows.find(w => w.appId === appId && !w.isClosed);
    if (existing) {
      if (!existing.isVisible) {
        existing.isVisible = true;
      }
      this.bringToFront(existing);
      return;
    }

    const dockClearance = this.getDockClearance();
    const frame = this.getAppFrame("project", dockClearance);
    const { x, y, w, h } = frame;

    const win = new AppWindow(
      appId,
      `Project - ${project.name}`,
      x,
      y,
      w,
      h,
      this.menuHeight,
      dockClearance,
      this.dock,
      {
        customBlocks: this.buildProjectBlocks(project),
        closeOnMinimize: true
      }
    );

    this.windows.push(win);
    this.bringToFront(win);
  }

  mousePressed(x, y) {
    // Dock click
    const dockIcon = this.dock.getIconAt(x, y);
    if (dockIcon) {
      const isFirstLaunch = !this.dock.openAppIds.has(dockIcon.appId);
      if (isFirstLaunch) {
        dockIcon.launchBounce();
      }
      this.openApp(dockIcon.appId);
      return;
    }

    // Window click
    const win = this.getTopWindowAt(x, y);
    if (win) {
      this.bringToFront(win);
      win.mousePressed(x, y);
      return;
    }

    // Desktop file click
    if (this.desktopFiles) {
      const action = this.desktopFiles.pointerDown(
        x,
        y,
        width,
        height,
        this.getDockClearance()
      );
      if (action) {
        if (action.type === "openApp" && action.appId) {
          this.openApp(action.appId);
        } else if (action.type === "openProject" && action.projectId) {
          this.openProjectWindow(action.projectId);
        } else if (action.type === "select") {
          this.activeWindow = null;
          this.topBar.setActiveApp(null);
        }
        return;
      }
    }

    // Clicked empty desktop
    this.activeWindow = null;
    this.topBar.setActiveApp(null);
  }

  mouseReleased(x, y) {
    if (this.activeWindow) {
      this.activeWindow.mouseReleased(x, y);
    }
    if (this.desktopFiles) {
      this.desktopFiles.pointerUp();
    }
  }

  mouseDragged(x, y, px, py) {
    if (this.activeWindow) {
      this.activeWindow.mouseDragged(x, y, px, py);
    }
    if (this.desktopFiles && this.desktopFiles.isDragging()) {
      this.desktopFiles.pointerDrag(x, y);
    }
  }

  syncActiveWindow() {
    if (!this.activeWindow) return;
    if (this.activeWindow.isVisible || this.activeWindow.openAt) return;

    for (let i = this.windows.length - 1; i >= 0; i--) {
      const candidate = this.windows[i];
      if (candidate.isVisible) {
        this.activeWindow = candidate;
        this.topBar.setActiveApp(candidate.title);
        return;
      }
    }

    this.activeWindow = null;
    this.topBar.setActiveApp(null);
  }

  buildProjectBlocks(project) {
    const blocks = [
      { type: "h1", text: project.name },
      { type: "p", text: project.summary }
    ];

    if (project.role) {
      blocks.push({ type: "h2", text: "Role" });
      blocks.push({ type: "p", text: project.role });
    }

    if (project.highlights && project.highlights.length) {
      blocks.push({ type: "h2", text: "Highlights" });
      for (const item of project.highlights) {
        blocks.push({ type: "p", text: `• ${item}` });
      }
    }

    if (project.stack) {
      blocks.push({ type: "h2", text: "Stack" });
      blocks.push({ type: "p", text: project.stack });
    }

    return blocks;
  }
}
