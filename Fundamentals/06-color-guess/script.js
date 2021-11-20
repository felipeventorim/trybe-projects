const colorOptions = document.getElementById('color-options');

function random() {
  return Math.ceil(Math.random() * 255);
}

function rgbColor() {
  return '('.concat(random(), ', ', random(), ', ', random(), ')');
}

function insertColorToGuess() {
  const p = document.getElementById('rgb-color');
  p.innerText = rgbColor();
}

function createColorOptions() {
  const color = document.createElement('div');
  color.classList.add('ball');
  return color;
}

function addColorOptions(numberColors) {
  if (!colorOptions.children.length) {
    for (let index = 0; index < numberColors; index += 1) {
      colorOptions.appendChild(createColorOptions());
    }
  }
}

function fillColorsOptions() {
  const colorToGuess = document.getElementById('rgb-color').innerText;
  const rightAnswer = Math.floor(Math.random() * 6);
  for (let index = 0; index < colorOptions.children.length; index += 1) {
    if (index === rightAnswer) {
      colorOptions.children[index].style.backgroundColor = 'rgb'.concat(colorToGuess);
    } else {
      colorOptions.children[index].style.backgroundColor = 'rgb'.concat(rgbColor());
    }
  }
}

function compareColor(event) {
  const colorToGuess = 'rgb'.concat(document.getElementById('rgb-color').innerText);
  const colorClick = event.target.style.backgroundColor;
  if (colorToGuess === colorClick) {
    return true;
  }
  return false;
}

function isCorrect(event) {
  const textAnswer = document.getElementById('answer');
  if (compareColor(event)) {
    textAnswer.innerText = 'Acertou!';
  } else {
    textAnswer.innerText = 'Errou! Tente novamente!';
  }
}

function score(event) {
  const scoreboard = document.getElementById('score');
  if (compareColor(event)) {
    scoreboard.innerText = parseInt(scoreboard.innerText, 10) + 3;
  }
}

function start() {
  insertColorToGuess();
  addColorOptions(6);
  fillColorsOptions();
  document.getElementById('answer').innerText = 'Escolha uma cor';

  colorOptions.addEventListener('click', isCorrect);
  colorOptions.addEventListener('click', score);

  const btnReset = document.getElementById('reset-game');
  btnReset.addEventListener('click', start);
}

window.onload = start;
