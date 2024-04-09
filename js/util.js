/**
 * Генерация случайного целого числа из заданного диапазона
 * @param {number} min - минимальное значение диапазона
 * @param {number} max - максимальное значение диапазона
 * @return {number} - целое случайное число
 */
const generateRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Проверка случайного числа на уникальность
 * @param {number} min - минимальное значение диапазона
 * @param {number} max - максимальное значение диапазона
 * @return {function} - функцию
 */
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = generateRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = generateRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Получить случайный элемент из массива
 * @param {Array} elements - исходный массив значений
 * @return {string} - элемент массива
 */
const getRandomElementFromArray = (elements) => elements[generateRandomInteger(1, (elements.length - 1))];

export {generateRandomInteger, createRandomIdFromRangeGenerator, getRandomElementFromArray};
