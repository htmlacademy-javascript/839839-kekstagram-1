function getPalindromeCheck(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  for(let i = 0; i <= (string.length - 1 - i); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

getPalindromeCheck('топот'); // true
getPalindromeCheck('ДовОд'); // true
getPalindromeCheck('Кекс'); // false
getPalindromeCheck('Лёша на полке клопа нашёл '); // true

function getPalindromeCheck2(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  for(let i = 1; i <= (string.length - 1); i++) {
    if (string[i - 1] !== string.at(-i)) {
      return false;
    }
  }
  return true;
}

getPalindromeCheck2('топот'); // true
getPalindromeCheck2('ДовОд'); // true
getPalindromeCheck2('Кекс'); // false
getPalindromeCheck2('Лёша на полке клопа нашёл '); // true

function getNumber(string) {
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
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15

