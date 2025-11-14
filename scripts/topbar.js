// scripts/topbar.js

class TopBar {
  constructor(height, baseLabel) {
    this.height = height;
    this.baseLabel = baseLabel || "Desktop";
    this.activeApp = null;
  }

  setActiveApp(name) {
    this.activeApp = name;
  }

  draw() {
    push();

    // Background bar: Apple-like off-white
    noStroke();
    fill(245, 245, 247, 235);
    rect(0, 0, width, this.height);

    // Bottom border / shadow hint
    stroke(200, 200, 210, 220);
    strokeWeight(1);
    line(0, this.height - 0.5, width, this.height - 0.5);

    const midY = this.height / 2;

    // Left side: Apple logo + active app name + menus
    noStroke();
    fill(29, 29, 31);

    // Apple logo slightly bigger
    textAlign(LEFT, CENTER);
    textSize(16);
    text("", 10, midY);

    // App name
    const appName = this.activeApp || this.baseLabel;
    textSize(13);
    let x = 10 + textWidth("") + 12;
    text(appName, x, midY);

    // Menus: File   Edit   View   Help
    const menus = ["File", "Edit", "View", "Help"];
    x += textWidth(appName) + 28;
    for (const label of menus) {
      text(label, x, midY);
      x += textWidth(label) + 24;
    }

    // Right side: date/time
    textAlign(RIGHT, CENTER);
    const now = new Date();

    const timeString = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });

    const dateString = now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    const rightText = dateString + "  " + timeString;
    text(rightText, width - 12, midY);

    pop();
  }
}
