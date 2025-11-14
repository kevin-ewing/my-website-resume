// scripts/desktop.js

class Desktop {
  constructor() {
    this.menuHeight = 28;
    this.dockHeight = 100;

    this.windows = [];
    this.activeWindow = null;

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

    this.topBar = new TopBar(this.menuHeight, "Kevin Desktop");
    this.dock = new Dock(this.apps, this.dockHeight);
  }

  onResize() {
    this.dock.onResize();

    for (const win of this.windows) {
      win.x = constrain(win.x, 16, width - win.w - 16);
      win.y = constrain(
        win.y,
        this.menuHeight + 16,
        height - win.h - this.dockHeight - 16
      );
    }
  }

  update() {
    const now = millis();

    // Handle delayed window visibility
    for (const win of this.windows) {
      if (!win.isVisible && win.openAt && now >= win.openAt) {
        win.isVisible = true;
        win.openAt = null;
      }
    }

    this.dock.update(mouseX, mouseY);
  }

  draw() {
    this.drawWallpaper();
    this.topBar.draw();
    this.drawWindows();
    this.dock.draw();
  }

  drawWallpaper() {
    const c1 = color(20, 32, 80);
    const c2 = color(12, 74, 144);

    for (let y = 0; y < height; y++) {
      const t = y / height;
      const col = lerpColor(c1, c2, t);
      stroke(col);
      line(0, y, width, y);
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
      if (w.isVisible && w.hitTest(x, y)) {
        return w;
      }
    }
    return null;
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
    let existing = this.windows.find(w => w.appId === appId);
    const delay = random(150, 450); // fake "loading" time

    if (existing) {
      existing.isVisible = false;
      existing.openAt = millis() + delay;
      this.bringToFront(existing);
      return;
    }

    const margin = 80;
    const w = min(700, width - margin * 2);
    const h = min(
      480,
      height - this.menuHeight - this.dockHeight - margin
    );
    const x = width / 2 - w / 2 + random(-40, 40);
    const y = this.menuHeight + margin / 2 + random(-20, 20);

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
      this.dockHeight
    );

    win.isVisible = false;
    win.openAt = millis() + delay;

    this.windows.push(win);
    this.bringToFront(win);
  }

  mousePressed(x, y) {
    // Dock click
    const dockIcon = this.dock.getIconAt(x, y);
    if (dockIcon) {
      dockIcon.launchBounce();
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

    // Clicked empty desktop
    this.activeWindow = null;
    this.topBar.setActiveApp(null);
  }

  mouseReleased(x, y) {
    if (this.activeWindow) {
      this.activeWindow.mouseReleased(x, y);
    }
  }

  mouseDragged(x, y, px, py) {
    if (this.activeWindow) {
      this.activeWindow.mouseDragged(x, y, px, py);
    }
  }
}
