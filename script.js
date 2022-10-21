// UI variables
const root = document.querySelector(":root");
const gridContainer = document.querySelector(".grid-container");
const colorSelector = document.querySelector("#color");
const settings = document.querySelector(".settings");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const shadingBtn = document.querySelector("#shadingBtn");
const brighteningBtn = document.querySelector("#brighteningBtn");
const clearBtn = document.querySelector("#clearBtn");
const sizeSlider = document.querySelector("#size");
const sizeText = document.querySelector("#size-text");

// Variables
let gridSize = 16;
let mouseHold = false;
let currentColor = "#000000";
let mode = "color";

// Default Settings
root.style.setProperty("--grid-background", "#FFFFFF");

// Generating grids for drawing
function generateGrids(size) {
  root.style.setProperty("--size", size);
  for (let i = 0; i < size ** 2; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.addEventListener("mouseover", (e) => dragHandler(e));
    grid.addEventListener("mousedown", (e) => dragHandler(e));
    gridContainer.appendChild(grid);
  }
}

generateGrids(gridSize);

// Handling dragging & Colors
function dragHandler(e) {
  if (e.type === "mouseover" && !mouseHold) return;

  if (mode === "color") {
    return e.target.style.setProperty(
      "--background",
      `rgb(${hexToRGBConverter(currentColor)})`
    );
  }

  if (mode === "rainbow") {
    return e.target.style.setProperty(
      "--background",
      `rgb(${randomColor().join(",")})`
    );
  }

  // Declaring backgroundColor for 2 modes below
  const backgroundColor = getComputedStyle(e.target)
    .getPropertyValue("--background")
    .match(/\d+/g);

  if (mode === "shading") {
    return e.target.style.setProperty(
      "--background",
      `rgb(${backgroundColor.map((a) =>
        parseInt(a) - 15 >= 0 ? parseInt(a) - 15 : parseInt(a) - parseInt(a) - 0
      )})`
    );
  }

  if (mode === "brightening") {
    return e.target.style.setProperty(
      "--background",
      `rgb(${backgroundColor.map((a) =>
        parseInt(a) + 15 <= 255
          ? parseInt(a) + 15
          : parseInt(a) + 255 - parseInt(a)
      )})`
    );
  }
}

// Hex To RGB converter
function hexToRGBConverter(hex) {
  const RGB = hex.slice(1).match(/.{1,2}/g);
  return [parseInt(RGB[0], 16), parseInt(RGB[1], 16), parseInt(RGB[2], 16)];
}

// EventListeners
document.body.addEventListener("mousedown", () => (mouseHold = true));
document.body.addEventListener("mouseup", () => (mouseHold = false));
colorSelector.addEventListener(
  "change",
  (e) => (currentColor = e.target.value)
);
colorBtn.addEventListener("click", () => (mode = "color"));
rainbowBtn.addEventListener("click", () => (mode = "rainbow"));
shadingBtn.addEventListener("click", () => (mode = "shading"));
brighteningBtn.addEventListener("click", () => (mode = "brightening"));
clearBtn.addEventListener("click", () => clearCanvas());
sizeSlider.addEventListener("change", (e) => slideSize(e.target.value));

// Events for buttons activating
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.id === "clearBtn") return;
    removeActive();
    e.target.classList.toggle("active");
  });
});

function removeActive() {
  settings.querySelectorAll("button").forEach((button) => {
    if (button.classList.contains("active")) button.classList.remove("active");
  });
}

// Random Color Generator
function randomColor() {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return [R, G, B];
}

// Clearing canvas
function clearCanvas() {
  gridContainer.innerHTML = "";
  generateGrids(gridSize);
}

// Size Slider
function slideSize(e) {
  sizeText.textContent = `${e} x ${e}`
  gridSize = e;
  clearCanvas();
}
