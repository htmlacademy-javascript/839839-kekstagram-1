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

const PHOTO_COUNT = 5;
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

const createIdGenerator = () => {
  let lastGenerator = 0;
  return function () {
    lastGenerator += 1;
    return lastGenerator;
  };
};

const generateRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = generateRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = generateRandomInteger(min, max);
      console.log("currentValue = ", currentValue);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const photoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);
// const imageId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

// const photoId = createIdGenerator();
const imageId = createIdGenerator();
const commentId = createRandomIdFromRangeGenerator(0, 200);

const getRandomArrayElement = (elements) => elements[generateRandomInteger(1, (elements.length - 1))];

const getComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${generateRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
});

// const getDescriptionPhoto = () => (
//   {
//     id: photoId(),
//     url: `photos/${imageId()}.jpg`,
//     description: getRandomArrayElement(DESCRIPTION_PHOTO),
//     likes: generateRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
//     comments: Array.from({length: generateRandomInteger(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT)}, getComment)
//   }
// );

const getDescriptionPhoto = (index) => (
  {
    id: index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTION_PHOTO[index - 1],
    likes: generateRandomInteger(LikeCount.MIN, LikeCount.MAX),
    comments: Array.from({length: generateRandomInteger(CommentCoutn.MIN, CommentCoutn.MAX)}, getComment)
  }
);

// const getArrayPhotos = () => Array.from({length: PHOTO_COUNT}, getDescriptionPhoto);
const getArrayPhotos = (index) => Array.from({length: PHOTO_COUNT},
  () => { getDescriptionPhoto(index) });

// console.log(getDescriptionPhoto());
// console.log(getArrayPhotos());

console.log(getDescriptionPhoto(imageId()));
// console.log(getArrayPhotos(imageId));
