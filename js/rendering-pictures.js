import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';

const containerForPicture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Сборка миниатюры
 * @param {Object} - данные миниатюры
 */
const getThumbnail = ({url, description, comments, likes}) => {
  const clonePictureTemplate = pictureTemplate.cloneNode(true);
  clonePictureTemplate.querySelector('.picture__img').src = url;
  clonePictureTemplate.querySelector('.picture__img').alt = description;
  clonePictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  clonePictureTemplate.querySelector('.picture__likes').textContent = likes;
  return clonePictureTemplate;
};

getPhotos(PHOTO_COUNT).forEach((thumbnail) => {
  containerForPicture.append(getThumbnail(thumbnail));
});


