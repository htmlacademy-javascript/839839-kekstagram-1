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
