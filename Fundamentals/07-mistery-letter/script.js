const generatedLetter = document.getElementById('carta-gerada');

function clearLetter() {
  generatedLetter.innerHTML = '';
}

function randomNumber(until) {
  return Math.floor(Math.random() * until);
}

function listOfStyles() {
  const numberOfStyles = randomNumber(3) + 2;
  const stylesToAdd = [];
  for (let index = 0; index < numberOfStyles; index += 1) {
    let style = randomNumber(4);
    while (stylesToAdd.indexOf(style) !== -1) {
      style = randomNumber(4);
    }
    stylesToAdd.push(style);
  }
  return stylesToAdd;
}

function addStyle() {
  const styles = [
    ['newspaper', 'magazine1', 'magazine2'],
    ['medium', 'big', 'reallybig'],
    ['rotateleft', 'rotateright'],
    ['skewleft', 'skewright'],
  ];
  const stylesList = listOfStyles();
  const classes = [];
  for (let index = 0; index < stylesList.length; index += 1) {
    if (stylesList[index] < 2) {
      classes[index] = styles[stylesList[index]][randomNumber(3)];
    } else {
      classes[index] = styles[stylesList[index]][randomNumber(2)];
    }
  }
  return classes.join(' ');
}

function createSpan(text, index) {
  const word = document.createElement('span');
  word.innerText = text[index];
  word.className = addStyle();
  return word;
}

function wordCounter(numberOfWords) {
  const countLetter = document.getElementById('carta-contador');
  countLetter.innerText = numberOfWords;
}

function generateLetter() {
  const button = document.getElementById('criar-carta');
  button.addEventListener('click', () => {
    clearLetter();
    let text = document.getElementById('carta-texto').value.split(' ');
    text = text.filter((element) => element !== '');
    if (!text.length) {
      generatedLetter.innerText = 'Por favor, digite o conteúdo da carta.';
    } else {
      for (let index = 0; index < text.length; index += 1) {
        generatedLetter.appendChild(createSpan(text, index));
      }
      wordCounter(text.length);
    }
  });
}

function wordClick() {
  generatedLetter.addEventListener('click', (event) => {
    const evento = event.target;
    evento.className = addStyle();
  });
}

function start() {
  generateLetter();
  wordClick();
}

window.onload = start;
