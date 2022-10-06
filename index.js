let columnNumber = 16;

const buttonContainer = document.querySelector(".button-container");
const sizeText = document.querySelector("#size");
const sliderSize = document.querySelector("#square-per-columns");

buttonContainer.style.cssText = `grid-template-columns: repeat(${columnNumber}, 1fr); grid-template-columns: repeat(${columnNumber}, 1fr)`;
sizeText.textContent = `${columnNumber} x ${columnNumber}`;

function sizeChanger(total, size) {
    buttonContainer.replaceChildren();
    for (let i = 0; i < total; i++) {
        const div = document.createElement("div");
        div.setAttribute("id", "square");
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        buttonContainer.appendChild(div);
    }
}
sliderSize.addEventListener("input", console.log("hello"), false);
sizeChanger(columnNumber ** 2, 500 / columnNumber);

const squares = document.querySelectorAll("#square");

squares.forEach((square) => {
    square.addEventListener("mouseenter", (e) => {
        e.target.style.background = "black";
    });
});

function changeBackgroundColor() {}
