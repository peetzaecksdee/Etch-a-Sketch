let color = "black";
let columnNumber = 16;

const squareContainer = document.querySelector(".square-container");
const sizeText = document.querySelector("#size");
const sliderSize = document.querySelector("#square-per-columns");

function clearGrid() {
    squareContainer.innerHTML = "";
    squareContainer.style.cssText = `grid-template-columns: repeat(${columnNumber}, 1fr); grid-template-columns: repeat(${columnNumber}, 1fr)`;
}

function updateSizeText(columnNumber) {
    sizeText.textContent = `${columnNumber} x ${columnNumber}`;
}

function setMode( newMode, e ) {
    activate(e);
    mode = newMode;
}

function setupGrid(columnNumber) {
    clearGrid();
    updateSizeText(columnNumber);

    const total = columnNumber ** 2;
    for (let i = 0; i < total; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", "square");
        square.addEventListener("mouseover", changeColor);
        square.addEventListener("mousedown", changeColor);
        squareContainer.appendChild(square);
    }
}
setupGrid(columnNumber);

const colorSel = document.querySelector("#color-selector");
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const brighteningBtn = document.querySelector("#brightening");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");

let mouseHold = false;
let mode = "color";

squareContainer.addEventListener("mousedown", () => (mouseHold = true));
squareContainer.addEventListener("mouseup", () => (mouseHold = false));
colorSel.addEventListener("input", (e) => color = e.target.value)
colorBtn.addEventListener("click", (e) => setMode("color", e));
rainbowBtn.addEventListener("click", (e) => setMode("rainbow", e));
eraserBtn.addEventListener("click", (e) => setMode("eraser", e));
clearBtn.addEventListener("click", () => clearCanvas());
sliderSize.addEventListener("input", (e) => {
    columnNumber = e.target.value;
    setupGrid(columnNumber);
});

document.body.onmousedown = () => (mouseHold = true);
document.body.onmouseup = () => (mouseHold = false);

function changeColor(e) {
    if (e.type === "mouseover" && !mouseHold) return;
    if (mode === "color") {
        e.target.style.background = color;
    } else if (mode === "rainbow") {
        const R = Math.random() * 256;
        const G = Math.random() * 256;
        const B = Math.random() * 256;
        e.target.style.background = `rgb(${R}, ${G}, ${B})`;
    } else if (mode === "eraser") {
        e.target.style.background = "";
    }
}

function clearCanvas() {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        if (square.style.background !== null) square.style.background = "";
    });
}

function activate(e) {
    document.querySelectorAll("button").forEach(button => {
        if (button.classList.contains("active")) button.classList.remove("active");
    });
    e.target.classList.add("active");
}