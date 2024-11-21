function checkMaxLength(string, maxLength) {
  return string.length <= maxLength;
}
// Cтрока короче 20 символов
checkMaxLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkMaxLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkMaxLength('проверяемая строка', 10); // false

function isPalindrome(word) {
  if (!word.length) {
    return false;
  }
  word = word.toLowerCase();
  word = word.replaceAll(' ', '');
  for (let i = 0; i <= Math.round(word.length / 2); i++) {
    if (word[i] !== word[word.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл ');

function extractNum(word) {
  word = word.toString();
  let result = '';
  const numbers = '0123456789';
  for (let i = 0; i < word.length; i++) {
    if (numbers.includes(word[i])) {
      result += word[i];
    }
  }
  return parseInt(result, 10);
}

extractNum(2023); // 2023
extractNum('ECMAScript 2022'); // 2022
extractNum('1 кефир, 0.5 батона'); // 105
extractNum('агент 007'); // 7
extractNum('а я томат'); // Nan
