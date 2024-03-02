function checkPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  let lengthString = string.length - 1;
  for(let i = 0; i <= lengthString; i++) {
    if (string[i] !== string[lengthString]) {
      return false;
    }
    lengthString--;
  }
  return true;
}

console.log(checkPalindrome('топот')); // true
console.log(checkPalindrome('ДовОд')); // true
console.log(checkPalindrome('Кекс')); // false
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
