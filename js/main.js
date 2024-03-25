const NAMES = [
  'Андрей',
  'Владимир',
  'Анна',
  'Галина',
  'Ярослав',
  'Олег',
  'Марина',
  'Дмитрий',
  'Сергей',
  'Виктория'
];

const SURNAMES = [
  'Шапиро',
  'Никитенко',
  'Нетто',
  'Штольберг',
  'Дей',
  'Грабчак',
  'Золя',
  'Шнайдер',
  'Бройк',
  'Моруа'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTO = [
  'Прекрасный пляж с белоснежным песком и парком: идеальное место для райского отдыха.',
  'Go to the beach',
  'Пляж с золотистым песком и лазурным морем, окруженный зелеными холмами и тропической растительностью.',
  'Все на пляж, фотографироваться!',
  'Веселого настроения!',
  'Эта машина выглядит так, будто только что сошла с экрана фильма о будущем! Я уверен, что на ней можно отправиться в путешествие на Луну и обратно.',
  'Вкусняшки?',
  'Кому морсика виноградного?))',
  'Взлетаем! ;)',
  'Очень удобная полка для обуви!',
  'Небольшие оазисы на пляже!',
  'Вот это машина! Она крутая, так что я почти уверен, что она может ездить по воде. А может быть, и по воздуху…',
  'Мм.. вкуснейший салатик.',
  'Суши-кот ;)',
  'Теплые домашние сапожки',
  '10000 метров над землей',
  'Выстубление хора',
  'Эта машина выглядит как настоящий зверь!',
  'Домашние тапочки с подсветкой это очень удобно',
  'Очень уютный отель с пальмами!',
  'Очень полужный завтрак',
  'Загадочный закат над морем',
  'Краб',
  'Зажигательный концерт',
  'Как думаете фотошоп?'
];

const PHOTO_COUNT = 25;
const AvatarCount = {
  MIN: 1,
  MAX: 6
};
const LikeCount = {
  MIN: 15,
  MAX: 200
};
const CommentCoutn = {
  MIN: 1,
  MAX: 5
};

/**
 * Генерация идентификатора
 * @return {function} - функция увеличения числа на единицу
 */
const createIdGenerator = () => {
  let lastGenerator = 0;
  return () => {
    lastGenerator += 1;
    return lastGenerator;
  };
};

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
 * @return {function} - уникальное число
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

const generateImageId = createIdGenerator();
const generateCommentId = createRandomIdFromRangeGenerator(1, 200);

/**
 * Получить случайный элемент из массива
 * @param {Array} elements - исходный массив значений
 * @return {string} - элемент массива
 */
const getRandomElementFromArray = (elements) => elements[generateRandomInteger(1, (elements.length - 1))];

/**
 * Генерация комментария
 * @return {Object} - данные комментария
 */
const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: getRandomElementFromArray(MESSAGES),
  name: `${getRandomElementFromArray(NAMES)} ${getRandomElementFromArray(SURNAMES)}`,
});

/**
 * Генерация фотографии
 * @param {number} index - идентификатор фотографии
 * @return {Object} - данные фотографии
 */
const generatePhoto = (index) => (
  {
    id: index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTION_PHOTO[index - 1],
    likes: generateRandomInteger(LikeCount.MIN, LikeCount.MAX),
    comments: Array.from({length: generateRandomInteger(CommentCoutn.MIN, CommentCoutn.MAX)}, generateComment)
  }
);

/**
 * Получить массив фотографий
 * @param {number} value - количество фотографий
 * @return {Array} - массив фотографий
 */
const getPhotos = (value) => Array.from({length: value},
  (_, index) => generatePhoto(index + 1));

getPhotos(PHOTO_COUNT, generateImageId);
