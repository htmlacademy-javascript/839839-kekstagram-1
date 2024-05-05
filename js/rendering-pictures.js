import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';

const containerForPicture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const publicationsData = getPhotos(PHOTO_COUNT);

/**
 * Сборка миниатюры
 * @param {Object} - данные миниатюры
 * @return {Object} - заполненный шаблон миниатюры
 */
const getThumbnail = ({url, description, comments, likes}) => {
  const clonePictureTemplate = pictureTemplate.cloneNode(true);
  clonePictureTemplate.querySelector('.picture__img').src = url;
  clonePictureTemplate.querySelector('.picture__img').alt = description;
  clonePictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  clonePictureTemplate.querySelector('.picture__likes').textContent = likes;
  return clonePictureTemplate;
};

/**
 * Отрисовка миниатюр
 * @param {Array} - массив миниатюр
 */
const renderingThumbnails = (publications) => {
  const publicationListFragment = document.createDocumentFragment();
  publications.forEach((thumbnail) => {
    publicationListFragment.append(getThumbnail(thumbnail));
  });
  containerForPicture.append(publicationListFragment);
};

renderingThumbnails(publicationsData);
