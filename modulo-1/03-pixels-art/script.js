function colorSelected(event) {
  const color = document.getElementsByClassName('color');
  for (let index = 0; index < color.length; index += 1) {
    color[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function fillPixel(event) {
  const selectedColor = document.querySelector('.selected');
  const eventTarget = event.target;
  eventTarget.style.backgroundColor = selectedColor.style.backgroundColor;
}

function createPalette() {
  const color = document.createElement('td');
  color.className = 'color';
  color.addEventListener('click', colorSelected);
  return color;
}

function addPalette(quantidadeDeCores) {
  const colorPalette = document.getElementById('color-palette');
  for (let index = 0; index < quantidadeDeCores; index += 1) {
    colorPalette.appendChild(createPalette());
  }
}

function randonColor() {
  const rgb = 'rgb(';
  return rgb.concat(Math.ceil(Math.random() * 25) * 10, ', ',
    Math.ceil(Math.random() * 25) * 10, ', ',
    Math.ceil(Math.random() * 25) * 10, ')');
}

function addColor() {
  const color = document.getElementsByClassName('color');
  color[0].style.backgroundColor = 'black';
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = randonColor();
  }
}

function createPixel() {
  const pixel = document.createElement('td');
  pixel.className = 'pixel';
  pixel.addEventListener('click', fillPixel);
  return pixel;
}

function quadroDePixels(linha, coluna) {
  const pixelBoard = document.getElementById('pixel-board');
  for (let indexColumn = 0; indexColumn < coluna; indexColumn += 1) {
    const tr = document.createElement('tr');
    pixelBoard.appendChild(tr);
    for (let indexLine = 0; indexLine < linha; indexLine += 1) {
      tr.appendChild(createPixel());
    }
  }
}

function clearBoard() {
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
}

function removeBoard() {
  const pixelBoard = document.getElementById('pixel-board');
  while (pixelBoard.children.length) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}

function generateBoard() {
  const input = document.querySelector('#board-size');
  let inputValue = input.value;
  if (inputValue === '') {
    window.alert('Board inválido!');
  } else {
    if (inputValue < 5) {
      inputValue = 5;
    } else if (inputValue > 50) {
      inputValue = 50;
    }
    removeBoard();
    quadroDePixels(inputValue, inputValue);
  }
}

function start() {
  addPalette(4);
  addColor();
  quadroDePixels(5, 5);

  const color = document.querySelector('.color');
  color.classList.add('selected');

  const buttonClear = document.querySelector('#clear-board');
  buttonClear.addEventListener('click', clearBoard);

  const buttonGenerate = document.querySelector('#generate-board');
  buttonGenerate.addEventListener('click', generateBoard);
}

window.onload = start;
