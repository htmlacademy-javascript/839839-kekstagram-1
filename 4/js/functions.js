const getPalindromeCheck = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  for(let i = 0; i <= (string.length - 1 - i); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

getPalindromeCheck('топот'); // true
getPalindromeCheck('ДовОд'); // true
getPalindromeCheck('Кекс'); // false
getPalindromeCheck('Лёша на полке клопа нашёл '); // true

const getPalindromeCheck2 = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  for(let i = 1; i <= (string.length - 1); i++) {
    if (string[i - 1] !== string.at(-i)) {
      return false;
    }
  }
  return true;
};

getPalindromeCheck2('топот'); // true
getPalindromeCheck2('ДовОд'); // true
getPalindromeCheck2('Кекс'); // false
getPalindromeCheck2('Лёша на полке клопа нашёл '); // true

const getNumber = (string) => {
  let newString = '';
  if (typeof(string) === 'number') {
    string = String(string);
  }
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      newString += string[i];
    }
  }
  return parseInt(newString, 10);
};

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15

const returnString = (string, minLength, stringSymbol) => {
  const fullBlock = Math.floor((minLength - string.length) / stringSymbol.length);
  const remainderSymbol = (minLength - string.length) % stringSymbol.length;
  let newString = '';
  for (let i = 0; i < remainderSymbol; i++) {
    newString += stringSymbol[i];
  }
  for (let i = 0; i < fullBlock; i++) {
    newString += stringSymbol;
  }
  return newString + string;
};

returnString('1', 2, '0'); // '01'
returnString('1', 4, '0'); // '0001'
returnString('q', 4, 'werty'); // 'werq'
returnString('q', 4, 'we'); // 'wweq'
returnString('qwerty', 4, '0'); // 'qwerty'

// кексограмм
const checkLengthString = (string, lengthString) => string.length <= lengthString;

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false

// кексобукинг
const getRandomNumber = (startNumber, endNumber, remainderSymbol) => {
  if (startNumber < 0 || endNumber < 0 || remainderSymbol < 0) {
    return NaN;
  }
  return (startNumber >= endNumber) ? NaN :
    Number((startNumber + Math.random() * (endNumber - startNumber))
      .toFixed(remainderSymbol));
};

getRandomNumber(5, 10, 4);
getRandomNumber(11, 10, 4);
getRandomNumber(11, 12, 4);
