//Функция для проверки длины строки

const checkLength = (str, length) => str.length <= length;

checkLength('Проверяемая строка', 20);


// Функция для проверки, является ли строка палиндромом

const checkPalindrome = (str) => {
  const trimStr = str.split(' ').join('').toLowerCase();
  if (trimStr === trimStr.split('').reverse().join('')) {
    return `Строка ${str} явялется палиндромом`;
  }
  return `Строка ${str} не явялется палиндромом`;
};

checkPalindrome('А роза упала на лапу Азора');


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа

const getNumber = (str) => {
  const convertedStr = str.toString();
  if (convertedStr.match(/\d+/g)) {
    return Number(convertedStr.replace(/\D/g, ''));
  }
  return NaN;
};

getNumber('а 78я 3487 4 томат 90 fvkdjbfv');


// Функция для формирования адресов файлов

const updateString = (str, minLength, symbols) => {
  let resultString = str;
  while (resultString.length < minLength) {
    const newResultLength = resultString.length + symbols.length;
    const actualString = newResultLength <= minLength ? symbols : symbols.slice(0, minLength - newResultLength);
    resultString = actualString + resultString;
  }
  return resultString;
};

updateString('q', 4, 'werty');
