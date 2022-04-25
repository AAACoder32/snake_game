// Getting the reference of dom 
// elements
const btnUp = document.querySelector('#UP');
const btnDown = document.querySelector('#DOWN');
const btnLeft = document.querySelector('#LEFT');
const btnRight = document.querySelector('#RIGHT');
const board = document.querySelector(".snake-board");

// Variables
let up = false;
let down = false;
let left = false;
let right = false;

let speed = 6;
let lastPaintTime = 0;

// Snake body array
let snakeArr = [{ x: 14, y: 3 }];
let food = { x: Math.round(Math.random() * (26 - 1) + 1), y: Math.round(Math.random() * (26 - 1) + 1) };
// Direction
let inputDir = { x: 0, y: 0 };

// Main function for game loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();

}


function gameEngine() {

  // Updating the snake array

  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert("Game over! To play again press any key");
    snakeArr = [{ x: 14, y: 3 }];
  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 20;

    let j = 1;
    while (snakeArr[j].x === food.x && snakeArr[j].y === food.y) {
      food = { x: Math.round(Math.random() * (b - a) + a), y: Math.round(Math.random() * (b - a) + a) };
      j++;
    }
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display snake head and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    }
    else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

}

function isCollide(snakeArr) {


  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  if (snakeArr[0].x >= 28 || snakeArr[0].x <= 0 || snakeArr[0].y >= 28 || snakeArr[0].y <= 0) {
    return true;
  }

  return false;
}


window.requestAnimationFrame(main);

btnUp.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});

btnDown.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});

btnLeft.addEventListener("click", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});
btnRight.addEventListener("click", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});