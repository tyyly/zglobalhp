(function () {
  "use strict";

  /* ---- helpers ---- */
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex.split("").map(function (c) { return c + c; }).join("");
    }
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return r + "," + g + "," + b;
  }

  /* Determine whether text on a background color should be black or white */
  function contrastColor(hex) {
    hex = hex.replace(/^#/, "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    /* Relative luminance (WCAG) */
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#000000" : "#ffffff";
  }

  /* ---- apply primary color ---- */
  function applyColor(hex, rgb) {
    rgb = rgb || hexToRgb(hex);
    var root = document.documentElement;
    root.style.setProperty("--theme-color1", hex);
    root.style.setProperty("--theme-color1-rgb", rgb);
    root.style.setProperty("--bg-theme-color1", hex);
    root.style.setProperty("--review-color", hex);
    root.style.setProperty("--text-color-bg-theme-color1", contrastColor(hex));
    /* Keep toggle button in sync */
    var toggle = document.getElementById("switcher-toggle");
    if (toggle) toggle.style.background = hex;
    /* Keep header in sync */
    var header = document.querySelector(".switcher-header");
    if (header) header.style.background = hex;
    /* Keep active mode btn in sync */
    syncModeBtns();
    localStorage.setItem("taxix_color1", hex);
    localStorage.setItem("taxix_color1_rgb", rgb);
  }

  /* ---- apply dark/light mode ---- */
  function applyMode(mode) {
    var body = document.body;
    if (mode === "dark") {
      if (!body.classList.contains("dark-layout")) {
        body.classList.add("dark-layout");
      }
    } else {
      body.classList.remove("dark-layout");
    }
    localStorage.setItem("taxix_mode", mode);
    syncModeBtns();
  }

  function syncModeBtns() {
    var isDark = document.body.classList.contains("dark-layout");
    var lightBtn = document.getElementById("light-mode-btn");
    var darkBtn  = document.getElementById("dark-mode-btn");
    if (!lightBtn || !darkBtn) return;
    if (isDark) {
      darkBtn.classList.add("active");
      lightBtn.classList.remove("active");
    } else {
      lightBtn.classList.add("active");
      darkBtn.classList.remove("active");
    }
  }

  /* ---- mark active swatch ---- */
  function markActiveSwatch(hex) {
    var swatches = document.querySelectorAll(".swatch");
    hex = hex.toLowerCase();
    swatches.forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("data-color").toLowerCase() === hex);
    });
  }

  /* ---- init ---- */
  function init() {
    var panel   = document.getElementById("switcher-panel");
    var toggle  = document.getElementById("switcher-toggle");
    var close   = document.getElementById("switcher-close");
    var swatches = document.querySelectorAll(".swatch");
    var customInput = document.getElementById("custom-color-input");
    var lightBtn = document.getElementById("light-mode-btn");
    var darkBtn  = document.getElementById("dark-mode-btn");
    var resetBtn = document.getElementById("switcher-reset");
    var wrapper  = document.getElementById("style-switcher");

    if (!wrapper) return;

    /* Restore saved preferences */
    var savedColor = localStorage.getItem("taxix_color1");
    var savedRgb   = localStorage.getItem("taxix_color1_rgb");
    var savedMode  = localStorage.getItem("taxix_mode");

    if (savedColor) {
      applyColor(savedColor, savedRgb || hexToRgb(savedColor));
      markActiveSwatch(savedColor);
      if (customInput) customInput.value = savedColor;
    }

    if (savedMode) {
      applyMode(savedMode);
    }

    /* Toggle open/close */
    if (toggle) {
      toggle.addEventListener("click", function () {
        wrapper.classList.toggle("open");
      });
    }

    if (close) {
      close.addEventListener("click", function () {
        wrapper.classList.remove("open");
      });
    }

    /* Swatch clicks */
    swatches.forEach(function (swatch) {
      swatch.addEventListener("click", function (e) {
        e.preventDefault();
        var hex = this.getAttribute("data-color");
        var rgb = this.getAttribute("data-rgb");
        applyColor(hex, rgb);
        markActiveSwatch(hex);
        if (customInput) customInput.value = hex;
      });
    });

    /* Custom color picker */
    if (customInput) {
      customInput.addEventListener("input", function () {
        var hex = this.value;
        applyColor(hex);
        markActiveSwatch(hex); /* will deselect all presets if no match */
      });
    }

    /* Mode buttons */
    if (lightBtn) {
      lightBtn.addEventListener("click", function () { applyMode("light"); });
    }
    if (darkBtn) {
      darkBtn.addEventListener("click", function () { applyMode("dark"); });
    }

    /* Reset */
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        var defaultColor = "#ffee02";
        var defaultRgb   = "255,238,2";
        applyColor(defaultColor, defaultRgb);
        markActiveSwatch(defaultColor);
        if (customInput) customInput.value = defaultColor;
        applyMode("light");
        localStorage.removeItem("taxix_color1");
        localStorage.removeItem("taxix_color1_rgb");
        localStorage.removeItem("taxix_mode");
      });
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
