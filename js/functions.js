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
