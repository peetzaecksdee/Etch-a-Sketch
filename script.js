// Variables
const root = document.querySelector(":root");
const gridContainer = document.querySelector(".grid-container");
let gridSize = 16;
let mouseHold = false;

// Default Settings
root.style.setProperty("--grid-background", "#FFFFFF")

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

// Handling dragging
function dragHandler(e) {
  if (e.type === "mouseover" && !mouseHold) return;
  e.target.style.setProperty("--grid-background", "#000000")
}

// Event for detecting mouse hold
document.body.addEventListener("mousedown", () => (mouseHold = true));
document.body.addEventListener("mouseup", () => (mouseHold = false));
