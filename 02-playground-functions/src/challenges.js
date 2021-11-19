// Desafio 1
function compareTrue(num1, num2) {
  if (num1 && num2) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(array) {
  return array[array.length - 1].concat(', ', array[0]);
}

// Desafio 5
function footballPoints(wins, ties) {
  return 3 * wins + 1 * ties;
}

// Desafio 6
function encontraMaiorNumero(arrayDeNumeros) {
  let maiorNumero = arrayDeNumeros[0];
  for (let index = 0; index < arrayDeNumeros.length; index += 1) {
    if (arrayDeNumeros[index] > maiorNumero) {
      maiorNumero = arrayDeNumeros[index];
    }
  }
  return maiorNumero;
}

function highestCount(arrayDeNumeros) {
  let quantidadeMaiorNumero = 0;
  let maiorNumero = encontraMaiorNumero(arrayDeNumeros);
  for (let index = 0; index < arrayDeNumeros.length; index += 1) {
    if (arrayDeNumeros[index] === maiorNumero) {
      quantidadeMaiorNumero += 1;
    }
  }
  return quantidadeMaiorNumero;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if ((cat1 - mouse) ** 2 < (cat2 - mouse) ** 2) {
    return 'cat1';
  }
  if (cat1 - mouse > cat2 - mouse) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function divisivelPor3ENaoPor5(arrayDeNumeros, index, array) {
  if (arrayDeNumeros[index] % 3 === 0 && arrayDeNumeros[index] % 5 !== 0) {
    return array.push('fizz');
  }
}
function divisivelPor5ENaoPor3(arrayDeNumeros, index, array) {
  if (arrayDeNumeros[index] % 3 !== 0 && arrayDeNumeros[index] % 5 === 0) {
    return array.push('buzz');
  }
}
function divisivelPor3EPor5(arrayDeNumeros, index, array) {
  if (arrayDeNumeros[index] % 3 === 0 && arrayDeNumeros[index] % 5 === 0) {
    array.push('fizzBuzz');
  }
}
function nãoDivisivelPor3ENemPor5(arrayDeNumeros, index, array) {
  if (arrayDeNumeros[index] % 3 !== 0 && arrayDeNumeros[index] % 5 !== 0) {
    array.push('bug!');
  }
}
function fizzBuzz(arrayDeNumeros) {
  let array = [];
  for (let index = 0; index < arrayDeNumeros.length; index += 1) {
    divisivelPor3ENaoPor5(arrayDeNumeros, index, array);
    divisivelPor5ENaoPor3(arrayDeNumeros, index, array);
    divisivelPor3EPor5(arrayDeNumeros, index, array);
    nãoDivisivelPor3ENemPor5(arrayDeNumeros, index, array);
  }
  return array;
}

// Desafio 9
function trocaLetra(troca, mensagem, index) {
  for (const key in troca) {
    if (mensagem[index] === key) {
      return troca[key];
    }
  }
}

function encodeDecode(mensagem, caracterDaTroca, troca) {
  let indexDaVogal = 0;
  let mensagemCodificada = '';
  for (let index = 0; index < mensagem.length; index += 1) {
    if (mensagem[index] === caracterDaTroca[indexDaVogal]) {
      indexDaVogal += 1;
      mensagemCodificada += trocaLetra(troca, mensagem, index);
    } else {
      mensagemCodificada += mensagem[index];
    }
  }
  return mensagemCodificada;
}

function encode(mensagem) {
  let troca = {
    a: '1',
    e: '2',
    i: '3',
    o: '4',
    u: '5',
  };
  let caracterDaTroca = mensagem.match(/[aeiou]/g);

  return encodeDecode(mensagem, caracterDaTroca, troca);
}

function decode(mensagem) {
  let troca = {
    1: 'a',
    2: 'e',
    3: 'i',
    4: 'o',
    5: 'u',
  };
  let caracterDaTroca = mensagem.match(/[12345]/g);

  return encodeDecode(mensagem, caracterDaTroca, troca);
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
