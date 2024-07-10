const PICTURES_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;

const sortByDiscussion = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const sortRamdom = () => Math.random() - 0.5;

/**
 * Сортировка изображений
 * @param {Object} data - данные публикаций
 * @return {Object} - отсортированные данные
 */
const filterPicture = (data) => {
  switch (currentFilter) {
    case Filter.DISCUSSED:
      return data.slice().sort(sortByDiscussion);
    case Filter.RANDOM:
      return data.slice().sort(sortRamdom).slice(0, PICTURES_COUNT);
    default:
      return data;
  }
};

/**
 * Добавить обработчик событий на фильтр
 * @param {Object} dataPicture - данные публикаций
 * @param {function} callback - функция обратного вызова
 */
const addEventListenerFilter = (dataPicture, callback) =>
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton === currentFilter) {
      return;
    }
    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(filterPicture(dataPicture));
  });

/**
 * Показать фильтр
 * @param {Object} picture - данные публикаций
 * @param {function} callback - функция обратного вызова
 */
const showFilter = (picture, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  addEventListenerFilter(picture, callback);
};

export {showFilter};
