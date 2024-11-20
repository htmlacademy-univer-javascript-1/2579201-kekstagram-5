function checkMaxLength(string, maxLength) {
  return string.length <= maxLength;
}
// Cтрока короче 20 символов
checkMaxLength("проверяемая строка", 20); // true
// Длина строки ровно 18 символов
checkMaxLength("проверяемая строка", 18); // true
// Строка длиннее 10 символов
checkMaxLength("проверяемая строка", 10); // false

function isPalindrome(word) {
  if (!word.length) {
    return;
  }
  word = word.toLowerCase();
  word = word.replaceAll(" ", "");
  let lastLetter = word.length - 1;
  for (let i = 0; i <= Math.round(word.length / 2); i++) {
    if (word[i] != word[lastLetter]) {
      return false;
    } else {
      lastLetter -= 1;
    }
  }
  return true;
}

// Строка является палиндромом
isPalindrome("топот"); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome("ДовОд"); // true
// Это не палиндром
isPalindrome("Кекс"); // false
isPalindrome("Лёша на полке клопа нашёл ");

function takeNum(string) {
  let result = "";
  let numbers = "0123456789";
  for (let i = 0; i < string.length; i++) {
    if (numbers.includes(string[i])) {
      result += string[i];
    }
  }
  return parseInt(result);
}

takeNum("2023 год"); // 2023
takeNum("ECMAScript 2022"); // 2022
takeNum("1 кефир, 0.5 батона"); // 105
takeNum("агент 007"); // 7
takeNum("а я томат"); // Nan
