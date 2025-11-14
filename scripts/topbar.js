// scripts/topbar.js

class TopBar {
  constructor(height, baseLabel) {
    this.height = height;
    this.baseLabel = baseLabel || "Desktop";
    this.activeApp = null;
    this.batteryLevel = 0.82;
    this.isBatteryCharging = false;
    this.initBatteryAPI();
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

    // Right side: status icons + date/time
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

    textSize(13);
    const rightPad = 12;
    const timeSlot = 160;

    const timeLabel = `${dateString}   ${timeString}`;
    const timeRight = width - rightPad;
    textAlign(RIGHT, CENTER);
    text(timeLabel, timeRight, midY);

    const batteryRight = timeRight - timeSlot;
    this.drawBatteryIcon(batteryRight, midY);

    pop();
  }

  initBatteryAPI() {
    if (typeof navigator !== "undefined" && navigator.getBattery) {
      navigator.getBattery().then(battery => {
        const update = () => {
          this.batteryLevel = battery.level;
          this.isBatteryCharging = battery.charging;
        };
        update();
        battery.addEventListener("levelchange", update);
        battery.addEventListener("chargingchange", update);
      }).catch(() => {
        this.batteryLevel = 0.82;
      });
    }
  }

  drawBatteryIcon(x, midY) {
    const bodyW = 18;
    const bodyH = 9;
    const capW = 3;
    const top = midY - bodyH / 2;

    push();
    rectMode(CORNER);
    stroke(76, 76, 78);
    strokeWeight(1.2);
    noFill();
    rect(x - bodyW, top, bodyW, bodyH, 1);
    rect(x, midY - 3.5, capW, 7, 1);

    const level = constrain(this.batteryLevel || 0, 0, 1);
    const fillWidth = (bodyW - 3.5) * level;
    noStroke();
    const fillColor = level <= 0.2 ? color(255, 69, 58) : color(40, 40, 42);
    fill(fillColor);
    rect(x - bodyW + 1, top + 1, max(2, fillWidth), bodyH - 2, 1);

    if (this.isBatteryCharging) {
      fill(255);
      const boltX = x - bodyW / 2;
      triangle(boltX - 2, midY - 4, boltX + 1, midY, boltX - 1, midY);
      triangle(boltX + 2, midY + 4, boltX - 1, midY, boltX + 1, midY);
    }

    const percent = Math.round(level * 100);
    const percentLabel = `${percent}%`;
    textAlign(RIGHT, CENTER);
    fill(29, 29, 31);
    textSize(11);
    text(percentLabel, x - bodyW - 8, midY);
    textStyle(NORMAL);
    pop();

    return bodyW + capW + textWidth(percentLabel) + 14;
  }
}
