import {showBigPicture} from './big-picture.js';
import {publicationsData} from './main.js';

const bigPicture = document.querySelector('.big-picture');
// const overlay = document.querySelector('.overlay');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

/**
 * Открыть окно с фотографией
 * @param {Object} evt - объект события
 */
const openPicture = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  const picture = publicationsData.find(
    (element) => element.id === +thumbnail.dataset.thumbnailId
  );
  showBigPicture(picture);
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Закрыть окно с фотографией
 * @param {Object} evt - объект события
 */
const closePicture = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

export {openPicture, closePicture};
