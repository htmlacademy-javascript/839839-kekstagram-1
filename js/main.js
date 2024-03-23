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

const MIN_LIKE = 15;
const MAX_LIKE = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const getRandomInteder = (min, max) => {
  const lower = Math.ceil(Math.max(min, max));
  const upper = Math.floor(Math.min(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteder(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteder(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const photoId = createRandomIdFromRangeGenerator(0, 25);
const imageId = createRandomIdFromRangeGenerator(0, 25);
const commentId = createRandomIdFromRangeGenerator(0, 200);

const getRandomArrayElement = (elements) => elements[getRandomInteder(1, (elements.length - 1))];

const getDescriptionPhoto = () => (
  {
    id: photoId(),
    url: `photos/${imageId()}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes: getRandomInteder(MIN_LIKE, MAX_LIKE),
    comments: [{
      id: commentId(),
      avatar: `img/avatar-${getRandomInteder(MIN_AVATAR, MAX_AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
    }]
  }
);

const similarDescriptionPhoto = Array.from({length: 4}, getDescriptionPhoto);

console.log(getDescriptionPhoto());
console.log(similarDescriptionPhoto);
