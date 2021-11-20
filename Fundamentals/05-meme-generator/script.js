function insertText() {
  const textInput = document.getElementById('text-input');
  textInput.addEventListener('keyup', (event) => {
    const memeText = document.getElementById('meme-text');
    memeText.innerText = event.target.value;
  });
}

/*
https://pt.stackoverflow.com/questions/42900/
como-posso-pegar-o-caminho-do-input-file
*/

function insertImage() {
  const memeInsert = document.getElementById('meme-insert');
  memeInsert.addEventListener('change', (event) => {
    const memeImage = document.getElementById('meme-image');
    const image = URL.createObjectURL(event.target.files[0]); // linha encontrada no link acima
    memeImage.setAttribute('src', image);
  });
}

function buttonBorder(event) {
  const buttonID = event.target.id;
  const memeImageContainer = document.getElementById('meme-image-container');
  if (memeImageContainer.className === buttonID) {
    memeImageContainer.className = 'border-model';
  } else {
    memeImageContainer.className = buttonID;
  }
}

function buttons() {
  const btns = document.querySelector('.btns');

  btns.firstElementChild.style.backgroundColor = 'red';
  btns.firstElementChild.nextElementSibling.style.backgroundColor = 'blue';
  btns.lastElementChild.style.backgroundColor = 'green';

  btns.addEventListener('click', buttonBorder);
}

function images() {
  const memes = document.querySelector('.memes');
  memes.addEventListener('click', (event) => {
    const memeImage = document.getElementById('meme-image');
    const image = event.target.src;
    memeImage.setAttribute('src', image);
  });
}

function start() {
  insertText();
  insertImage();
  buttons();
  images();
}

window.onload = start;
